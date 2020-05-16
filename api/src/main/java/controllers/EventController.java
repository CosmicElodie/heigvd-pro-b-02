package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import utils.Utils;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.sql.DataSource;
import java.io.StringReader;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@RestController
public class EventController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/event/all")
    public String eventList() throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventJSON(0) AS event_result");

            events.next();

            result = events.getString("event_result");
        }
        return result;
    }

    @GetMapping("/event/last_events")
    public String lastEventsList(@RequestParam("limit_nb") int limit_nb) throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("SELECT DEV.getEventJSON(limit_nb) AS event_result");

            events.next();

            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/upcomingEvents")
    public String upcomingEventList() throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getUpcomingEventJSON() AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/detail")
    public String eventDetail(@RequestParam("event_id") int event_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getDetailEventJson(" + event_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/get_participants")
    public String getEventPartitipants(@RequestParam("event_id") int event_id) throws SQLException {
        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getParticipantsEvent(" + event_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/participated_by_user")
    public String eventParticipatedByUser(@RequestParam("user_id") int user_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventParticipatedByUserJSON(" + user_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/created_by_user")
    public String eventCreatedByUser(@RequestParam("user_id") int user_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventCreatedByUserJSON(" + user_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @GetMapping("/event/from_house")
    public String eventFromHouseList(@RequestParam("house_id") int house_id, @RequestParam("limit_nb") int limit_nb) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventFromHouseJSON(" + house_id + ", " + limit_nb + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/insert_event")
    public String insertEvent(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam(value = "is_competitive", required = false) Integer is_competitive,
                              @RequestParam(value = "difficulty", required = false) Integer difficulty,
                              @RequestParam(value = "price", required = false) Integer price,
                              @RequestParam(value = "battleroyal", required = false) Integer battleroyale,
                              @RequestParam("attendees_min") int attendees_min,
                              @RequestParam("attendees_max") int attendees_max,
                              @RequestParam("date_begin") Date date_begin,
                              @RequestParam("date_end") Date date_end,
                              @RequestParam("deadline_reservation") Date deadline_reservation,
                              @RequestParam("location") String location,
                              @RequestParam("no") String no,
                              @RequestParam("street") String street,
                              @RequestParam("postal_code") int postal_code,
                              @RequestParam("city") String city,
                              @RequestParam(value = "house_id", required = false) Integer house_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int user_id = user.getId();

        if (name.length() == 0 || description.length() >= 100) {
            return Utils.errorJSONObjectBuilder("incorrect_input_length").build().toString();
        }

        if (attendees_min > attendees_max) {
            return Utils.errorJSONObjectBuilder("error_min_max_attendees_length").build().toString();
        }

        //Check for permissions/syntax errors

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertEvent = conn.prepareCall("{call DEV.createEvent(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
            insertEvent.setString(1, name);
            insertEvent.setString(2, description);
            if (is_competitive == null) {
                insertEvent.setNull(3, Types.INTEGER);
            } else {
                insertEvent.setInt(3, is_competitive);
            }
            if (battleroyale == null) {
                insertEvent.setNull(4, Types.INTEGER);
            } else {
                insertEvent.setInt(4, battleroyale);
            }
            if (difficulty == null) {
                insertEvent.setNull(5, Types.INTEGER);
            } else {
                insertEvent.setInt(5, difficulty);
            }
            if (price == null) {
                insertEvent.setNull(6, Types.INTEGER);
            } else {
                insertEvent.setInt(6, price);
            }

            insertEvent.setInt(7, attendees_min);
            insertEvent.setInt(8, attendees_max);
            insertEvent.setDate(9, deadline_reservation);
            insertEvent.setDate(10, date_begin);
            insertEvent.setDate(11, date_end);
            insertEvent.setString(12, location);

            String address = street + " " + no + ", " + postal_code + " " + city;
            insertEvent.setString(13, address);
            insertEvent.setInt(14, user_id);

            if (house_id == null) {
                insertEvent.setNull(15, Types.INTEGER);
            } else {
                insertEvent.setInt(15, house_id);
            }


            boolean hasRs = insertEvent.execute();
            if (hasRs) {
                ResultSet rs = insertEvent.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject = Utils.successJSONObjectBuilder("event_created", reader);
            }
        }
        return responseObject.build().toString();
    }

    @PostMapping("/event/update_event")
    public String updateEvent(@RequestParam(value = "event_id") int event_id,
                              @RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam(value = "is_competitive", required = false) Integer is_competitive,
                              @RequestParam(value = "difficulty", required = false) Integer difficulty,
                              @RequestParam(value = "price", required = false) Integer price,
                              @RequestParam(value = "battleroyal", required = false) Integer battleroyale,
                              @RequestParam("attendees_min") int attendees_min,
                              @RequestParam("attendees_max") int attendees_max,
                              @RequestParam("date_begin") Date date_begin,
                              @RequestParam("date_end") Date date_end,
                              @RequestParam("deadline_reservation") Date deadline_reservation,
                              @RequestParam("location") String location,
                              @RequestParam("no") String no,
                              @RequestParam("street") String street,
                              @RequestParam("postal_code") int postal_code,
                              @RequestParam("city") String city,
                              @RequestParam(value = "house_id", required = false) Integer house_id) throws SQLException {

        JsonObjectBuilder responseObject;

        if (name.length() == 0 || description.length() >= 100) {
            return Utils.errorJSONObjectBuilder("incorrect_input_length").build().toString();
        }

        if (attendees_min > attendees_max) {
            return Utils.errorJSONObjectBuilder("error_min_max_attendees_length").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            // check si nombre d'attendee max ne descend pas en dessous du nombre de participants.
            if (!conn.createStatement().executeQuery(
                    "SELECT count(*) as nb_attendees\n" +
                            "FROM  user_participate_event\n" +
                            "WHERE event_id = '" + event_id + "'\n" +
                            "HAVING nb_attendees <= '" + attendees_max + "';"
            ).next()) {
                return Utils.errorJSONObjectBuilder("error_max_attendees_lower_than_nb_attendees").build().toString();
            }
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement updateEvent = conn.prepareCall("{call DEV.updateEvent(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
            updateEvent.setInt(1, event_id);
            updateEvent.setString(2, name);
            updateEvent.setString(3, description);
            if (is_competitive == null) {
                updateEvent.setNull(4, Types.INTEGER);
            } else {
                updateEvent.setInt(4, is_competitive);
            }
            if (battleroyale == null) {
                updateEvent.setNull(5, Types.INTEGER);
            } else {
                updateEvent.setInt(5, battleroyale);
            }
            if (difficulty == null) {
                updateEvent.setNull(6, Types.INTEGER);
            } else {
                updateEvent.setInt(6, difficulty);
            }
            if (price == null) {
                updateEvent.setNull(7, Types.INTEGER);
            } else {
                updateEvent.setInt(7, price);
            }

            updateEvent.setInt(8, attendees_min);
            updateEvent.setInt(9, attendees_max);
            updateEvent.setDate(10, deadline_reservation);
            updateEvent.setDate(11, date_begin);
            updateEvent.setDate(12, date_end);
            updateEvent.setString(13, location);

            String address = street + " " + no + ", " + postal_code + " " + city;
            updateEvent.setString(14, address);

            if(house_id == null) {
                updateEvent.setNull(15, Types.INTEGER);
            } else {
                updateEvent.setInt(16, house_id);
            }


            updateEvent.execute();
            responseObject = Utils.successJSONObjectBuilder("event_updated", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("/event/join_event")
    public String joinEvent(@RequestParam("user_id") int user_id,
                            @RequestParam("event_id") int event_id
                            ) throws SQLException {

        JsonObjectBuilder responseObject;

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement joinEvent = conn.prepareCall("{call DEV.joinEvent(?,?)}");
            joinEvent.setInt(1, user_id);
            joinEvent.setInt(2, event_id);

            joinEvent.execute();
            responseObject = Utils.successJSONObjectBuilder("event_joined", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("/event/quit_event")
    public String quitEvent(@RequestParam("user_id") int user_id,
                            @RequestParam("event_id") int event_id
    ) throws SQLException {

        JsonObjectBuilder responseObject;

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement quitEvent = conn.prepareCall("{call DEV.quitEvent(?,?)}");
            quitEvent.setInt(1, user_id);
            quitEvent.setInt(2, event_id);

            quitEvent.execute();
            responseObject = Utils.successJSONObjectBuilder("event_quited", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("/event/cancel_event")
    public String cancelEvent(@RequestParam("event_id") int event_id) throws SQLException {

        JsonObjectBuilder responseObject;

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement cancelEvent = conn.prepareCall("{call DEV.cancelEvent(?)}");
            cancelEvent.setInt(1, event_id);

            cancelEvent.execute();
            responseObject = Utils.successJSONObjectBuilder("event_cancelled", null);
        }
        return responseObject.build().toString();
    }


    @PostMapping("/event/result/individual")
    public String eventResultIndividual(@RequestParam("first_id") int first_place,
                                        @RequestParam("second_id") int second_place,
                                        @RequestParam("third_id") int third_place,
                                        @RequestParam("event_id") int event_id,
                                        @RequestParam("difficulty") int difficulty
    ) throws SQLException {

        return setWinnerPoints(first_place, second_place, third_place, event_id, difficulty);
    }

    @PostMapping("/event/result/house")
    public String eventResultHouse(@RequestParam("first_id") int first_place,
                                   @RequestParam("second_id") int second_place,
                                   @RequestParam("third_id") int third_place,
                                   @RequestParam("event_id") int event_id,
                                   @RequestParam("difficulty") int difficulty
    ) throws SQLException {

        return setWinnerPoints(first_place, second_place, third_place, event_id, difficulty);
    }

    private String setWinnerPoints(@RequestParam("first_id") int first_place, @RequestParam("second_id") int second_place,
                                   @RequestParam("third_id") int third_place, @RequestParam("event_id") int event_id,
                                   @RequestParam("difficulty") int difficulty) throws SQLException {
        JsonObjectBuilder responseObject;

        if(first_place == -1 ||second_place  == -1 || third_place == -1) {
            return Utils.errorJSONObjectBuilder("no_valid_user_id").build().toString();
        }

        if(first_place == second_place || second_place == third_place || third_place == first_place) {
            return Utils.errorJSONObjectBuilder("same_winner_in_two_or_more_place").build().toString();
        }

        String sqlFirstPoint = Utils.getPointsEvents(difficulty, 1);
        String sqlSecondPoint = Utils.getPointsEvents(difficulty, 2);
        String sqlThirdPoint = Utils.getPointsEvents(difficulty, 3);

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int first_point = Utils.getSingletonInt(statement, sqlFirstPoint);
            int second_point = Utils.getSingletonInt(statement, sqlSecondPoint);
            int third_point = Utils.getSingletonInt(statement, sqlThirdPoint);

            CallableStatement pointsParticipation = conn.prepareCall("{CALL insertPointsBasedFromEvent(?)}");
            pointsParticipation.setInt(1, event_id);
            pointsParticipation.execute();

            CallableStatement firstPlaceProcedure = conn.prepareCall("{CALL insertPointsFromEvent(?, ?, ?)}");
            firstPlaceProcedure.setInt(1, event_id);
            firstPlaceProcedure.setInt(2, first_place);
            firstPlaceProcedure.setInt(3, first_point);
            firstPlaceProcedure.execute();

            CallableStatement secondPlaceProcedure = conn.prepareCall("{CALL insertPointsFromEvent(?, ?, ?)}");
            secondPlaceProcedure.setInt(1, event_id);
            secondPlaceProcedure.setInt(2, second_place);
            secondPlaceProcedure.setInt(3, second_point);
            secondPlaceProcedure.execute();

            CallableStatement thirdPlaceProcedure = conn.prepareCall("{CALL insertPointsFromEvent(?, ?, ?)}");
            thirdPlaceProcedure.setInt(1, event_id);
            thirdPlaceProcedure.setInt(2, third_place);
            thirdPlaceProcedure.setInt(3, third_point);
            thirdPlaceProcedure.execute();

            CallableStatement endStatusEvent = conn.prepareCall("{CALL endStatusEvent(?)}");
            endStatusEvent.setInt(1, event_id);
            endStatusEvent.execute();

            responseObject = Utils.successJSONObjectBuilder("points_from_individual_events_added", null);

        }
        return responseObject.build().toString();
    }

    @PostMapping("/event/result/global")
    public String eventResultGlobal(@RequestParam("first_id") int first_place,
                                    @RequestParam("second_id") int second_place,
                                    @RequestParam("third_id") int third_place,
                                    @RequestParam("event_id") int event_id,
                                    @RequestParam("difficulty") int difficulty) throws SQLException {

        JsonObjectBuilder responseObject;



        if(first_place == second_place || second_place == third_place || third_place == first_place) {
            return Utils.errorJSONObjectBuilder("same_winner_in_two_or_more_place").build().toString();
        }
        if(first_place > 5 || first_place < 1 || second_place > 5 || second_place < 1 || third_place > 5 || third_place < 1 ) {
            return Utils.errorJSONObjectBuilder("house_id_out_of_bonds").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int first_point = Utils.getSingletonInt(statement, Utils.getPointsEvents(difficulty, 1));
            int second_point = Utils.getSingletonInt(statement, Utils.getPointsEvents(difficulty, 2));
            int third_point = Utils.getSingletonInt(statement, Utils.getPointsEvents(difficulty, 3));

            int nbFirst = Utils.getSingletonInt(statement, Utils.getNbParticipant(first_place, event_id));
            int nbSecond = Utils.getSingletonInt(statement, Utils.getNbParticipant(second_place, event_id));
            int nbThird = Utils.getSingletonInt(statement, Utils.getNbParticipant(third_place, event_id));

            int pointPerMemberFirst = (int) Math.ceil(first_point/nbFirst);
            int pointPerMemberSecond = (int) Math.ceil(second_point/nbSecond);
            int pointPerMemberThird = (int) Math.ceil(third_point/nbThird);

            CallableStatement pointsParticipation = conn.prepareCall("{CALL insertPointsBasedFromEvent(?)}");
            pointsParticipation.setInt(1, event_id);
            pointsParticipation.execute();

            CallableStatement firstPlaceProcedure = conn.prepareCall("{CALL insertPointsGroupFromEvent(?, ?, ?)}");
            firstPlaceProcedure.setInt(1, event_id);
            firstPlaceProcedure.setInt(2, pointPerMemberFirst);
            firstPlaceProcedure.setInt(3, first_place);
            firstPlaceProcedure.execute();

            CallableStatement secondPlaceProcedure = conn.prepareCall("{CALL insertPointsGroupFromEvent(?, ?, ?)}");
            secondPlaceProcedure.setInt(1, event_id);
            secondPlaceProcedure.setInt(2, pointPerMemberSecond);
            secondPlaceProcedure.setInt(3, second_place);
            secondPlaceProcedure.execute();

            CallableStatement thirdPlaceProcedure = conn.prepareCall("{CALL insertPointsGroupFromEvent(?, ?, ?)}");
            thirdPlaceProcedure.setInt(1, event_id);
            thirdPlaceProcedure.setInt(2, pointPerMemberThird);
            thirdPlaceProcedure.setInt(3, third_place);
            thirdPlaceProcedure.execute();

            CallableStatement endStatusEvent = conn.prepareCall("{CALL endStatusEvent(?)}");
            endStatusEvent.setInt(1, event_id);
            endStatusEvent.execute();


            responseObject = Utils.successJSONObjectBuilder("points_from_group_event_added", null);

        }
        return responseObject.build().toString();
    }

    /*@PostMapping("/event/event_create")
    public String eventCreate(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam("is_competitive") int is_competitive,
                              @RequestParam("battle_royal") int battleroyale,
                              @RequestParam("limitation") String limitation,
                              @RequestParam("difficulty") String difficulty,
                              @RequestParam("nb_min_participants") int nbMinParticipants,
                              @RequestParam("nb_max_participants") int nbMaxParticipants,
                              @RequestParam("date_begin") String date_begin,
                              @RequestParam("date_end") String date_end,
                              @RequestParam("deadline_reservation") String deadline_reservation,
                              @RequestParam("location") String location,
                              @RequestParam("street") String street,
                              @RequestParam("street_nb") String street_nb,
                              @RequestParam("zip") String zip,
                              @RequestParam("city") String city) throws SQLException
    {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try(Connection conn = dataSource.getConnection()) {

            CallableStatement createEvent = conn.prepareCall("{call DEV.createEvent(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");

            // Date of creation
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Calendar cal = Calendar.getInstance();

            createEvent.setString(1, name);                     // Name of the event
            createEvent.setString(2, description);              // Description of the event
            createEvent.setInt(3, is_competitive);              // Is the event competitive ?
            createEvent.setInt(4, battleroyale);                // Is the event a battle royale ?
            createEvent.setString(5, limitation);               // Can all the houses participate ?
            createEvent.setString(6, difficulty);               // Difficulty estimated of the event
            createEvent.setInt(7, 0);                           // Price of the event
            createEvent.setInt(8, nbMinParticipants);           // Min number of attendees
            createEvent.setInt(9, nbMaxParticipants);           // Max number of attendees
            createEvent.setString(10, deadline_reservation);    // Deadline to sign up to the event
            createEvent.setString(11, dateFormat.format(cal));  // Date of creation of the event
            createEvent.setString(12, date_begin);              // Date at which the event begins
            createEvent.setString(13, date_end);                // Date at which the event ends
            createEvent.setString(14, location);                // Location of the event
            createEvent.setString(15, street +                  // Address  of the event
                                      street_nb +
                                      zip +
                                      city);
            createEvent.setInt(16, user.getId());               // ID of the creator
            createEvent.setInt(17, user.getHouseID());          // House ID of the creator


                Conditions
                ----------
                  1. Participants MAX >= participants MIN
                  2. Date début <= date fin


            boolean hasRs = createEvent.execute();
            if (hasRs) {
                ResultSet rs = createEvent.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject.add("status", "ok");
                responseObject.add("dialog_id", "event_created");
                responseObject.add("data", reader.readValue());
            }
        }
        return responseObject.build().toString();
    }*/

    @PostMapping("/event/delete_event")
    public String eventDelete(@RequestParam("event_id") int event_id) throws SQLException {
        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            String sqlGetOwnerID = "SELECT user_id as result FROM event WHERE event = " + event_id;
            String sqlGetEventHouseID = "SELECT house_id as result FROM event WHERE event_id = " + event_id;

            int eventHouseId = Utils.getSingletonInt(statement, sqlGetEventHouseID);
            int eventOwnerUserId = Utils.getSingletonInt(statement, sqlGetOwnerID);

            boolean isAllowedOperation =
                    user.getId() == eventOwnerUserId ||
                            (user.getId() != eventOwnerUserId && user.getAccessLevel() >= 50) ||
                            (user.getId() != eventOwnerUserId && user.getHouseID() == eventHouseId && user.getAccessLevel() >= 25);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("event_delete_insufficient_permission").build().toString();
            }


            CallableStatement deleteEvent = conn.prepareCall("{call DEV.deleteEvent(?)}");
            deleteEvent.setInt(1, event_id);
            deleteEvent.execute();

            responseObject = Utils.successJSONObjectBuilder("event_deleted", null);
        }

        return responseObject.build().toString();
    }
}

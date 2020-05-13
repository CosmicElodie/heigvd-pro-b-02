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
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.sql.DataSource;
import java.io.StringReader;
import java.sql.*;

@RestController
public class EventController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/event/all")
    public String eventList() throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventJSON() AS event_result");

            events.next();

            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/upcomingEvents")
    public String upcomingEventList() throws SQLException {

        String result = null;

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

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getDetailEventJson(" + event_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/participated_by_user")
    public String eventParticipatedByUser(@RequestParam("user_id") int user_id) throws SQLException {

        String result = null;

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

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventCreatedByUserJSON(" + user_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @GetMapping("/event/from_house")
    public String eventFromHouseList(@RequestParam("house_id") int house_id) throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventFromHouseJSON(" + house_id + ") AS event_result");

            events.next();
            result = events.getString("event_result");
        }
        return result;
    }

    @PostMapping("/event/insert_event")
    public String insertEvent(@RequestParam("name") String name, @RequestParam("description") String description,
                              @RequestParam(value = "is_competitive", required = false) Integer is_competitive,
                              @RequestParam(value = "difficulty", required = false) Integer difficulty,
                              @RequestParam(value = "price", required = false) Integer price,
                              @RequestParam(value = "battleroyale", required = false) Integer battleroyale,
                              @RequestParam("attendees_min") int attendees_min,
                              @RequestParam("attendees_max") int attendees_max, @RequestParam("date_begin") Date date_begin,
                              @RequestParam("date_end") Date date_end, @RequestParam("deadline_reservation") Date deadline_reservation,
                              @RequestParam("location") String location, @RequestParam("no") String no,
                              @RequestParam("street") String street, @RequestParam("postal_code") int postal_code,
                              @RequestParam("city") String city,
                              @RequestParam(value = "battleroyale", required = false) Integer house_id) throws SQLException {

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

            if(house_id == null) {
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
                              @RequestParam(value = "battleroyale", required = false) Integer battleroyale,
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
                              @RequestParam(value = "battleroyale", required = false) Integer house_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

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

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

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

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

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

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement cancelEvent = conn.prepareCall("{call DEV.cancelEvent(?)}");
            cancelEvent.setInt(1, event_id);

            cancelEvent.execute();
            responseObject = Utils.successJSONObjectBuilder("event_cancelled", null);
        }
        return responseObject.build().toString();
    }
}

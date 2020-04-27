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

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet events = stmt.executeQuery("select DEV.getEventJSON() AS event_result");

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
                responseObject = Utils.successJSONObjectBuilder("forum_created", reader);
            }
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
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
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

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
                              @RequestParam("attendees_min") int attendees_min,
                              @RequestParam("attendees_max") int attendees_max, @RequestParam("date_begin") Date date_begin,
                              @RequestParam("date_end") Date date_end, @RequestParam("deadline_reservation") Date deadline_reservation,
                              @RequestParam("location") String location, @RequestParam("no") String no,
                              @RequestParam("street") String street, @RequestParam("postal_code") int postal_code,
                              @RequestParam("city") String city, @RequestParam("house_id") int house_id) throws SQLException {

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

            CallableStatement insertEvent = conn.prepareCall("{call DEV.createEvent(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
            insertEvent.setString(1, name);
            insertEvent.setString(2, description);
            if (is_competitive == null) {
                insertEvent.setNull(3, Types.INTEGER);
            } else {
                insertEvent.setInt(3, is_competitive);
            }
            if (difficulty == null) {
                insertEvent.setNull(4, Types.INTEGER);
            } else {
                insertEvent.setInt(4, difficulty);
            }
            if (price == null) {
                insertEvent.setNull(5, Types.INTEGER);
            } else {
                insertEvent.setInt(5, price);
            }

            insertEvent.setInt(6, attendees_min);
            insertEvent.setInt(7, attendees_max);
            insertEvent.setDate(8, deadline_reservation);
            insertEvent.setDate(9, date_begin);
            insertEvent.setDate(10, date_end);
            insertEvent.setString(11, location);

            String address = street + " " + no + ", " + postal_code + " " + city;
            insertEvent.setString(12, address);
            insertEvent.setInt(13, user_id);
            insertEvent.setInt(14, house_id);


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
}

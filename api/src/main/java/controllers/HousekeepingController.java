package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import utils.Utils;

import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.*;

@RestController
public class HousekeepingController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/housekeeping/all")
    public String forumList() throws SQLException {
        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getAllUsersJSON() as result");
            forums.next();
            result = forums.getString("result");
        }
        return result;
    }

    @PostMapping("/housekeeping/setpoints")
    public String setExtraPoints(@RequestParam("user_id") int user_id,
                                 @RequestParam("points") int points) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int monthPoints = Utils.getSingletonInt(statement,
                    "SELECT points_month as result FROM userActive where user_id = " + user_id);


            if((monthPoints + points) < 0) {
                return Utils.errorJSONObjectBuilder("negative_result_points").build().toString();
            }

            int active = Utils.getSingletonInt(statement,
                    "SELECT active AS result FROM user WHERE user_id = " + user_id);

            if(active ==  0) {
                return Utils.errorJSONObjectBuilder("cannot_set_point_for_inactive_user").build().toString();
            }


            CallableStatement setPointsToUser = conn.prepareCall("INSERT INTO points_log (points, origin, user_id) " +
                            "VALUES (? , ? , ?)");
            setPointsToUser.setInt(1, points);
            setPointsToUser.setString(2, points < 0 ? "malus_points" : "bonus_points");
            setPointsToUser.setInt(3, user_id);
            setPointsToUser.execute();
        }
        return Utils.successJSONObjectBuilder("points_added", null).build().toString();
    }

    @PostMapping("/housekeeping/setroles")
    public String setRolesToUser(@RequestParam("user_id") int user_id,
                                 @RequestParam("new_accesslevel") int accesslevel) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            if(accesslevel < 0) {
                return Utils.errorJSONObjectBuilder("accesslevel_cannot_be_null").build().toString();
            } else if (!(accesslevel == 0 || accesslevel == 25 || accesslevel == 50 || accesslevel == 75)) {
                return Utils.errorJSONObjectBuilder("unknown_accesslevel").build().toString();
            }

            CallableStatement editHouseId = conn.prepareCall("UPDATE user SET access_level = ? WHERE user_id = " + user_id);
            editHouseId.setInt(1, accesslevel);
            editHouseId.execute();
        }
        return Utils.successJSONObjectBuilder("access_edited", null).build().toString();
    }

    @PostMapping("/housekeeping/setstatus")
    public String setStatusToUser(@RequestParam("user_id") int user_id,
                                  @RequestParam("new_status_id") int status_id) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            String getStatusID = "SELECT status_id AS result FROM DEV.status WHERE status_id = " + status_id;

            if (!statement.executeQuery(getStatusID).next()) {
                return Utils.errorJSONObjectBuilder("status_id_out_of_bound").build().toString();
            }

            CallableStatement editHouseId = conn.prepareCall("UPDATE user SET status_id = ? WHERE user_id = " + user_id);
            editHouseId.setInt(1, status_id);
            editHouseId.execute();
        }
        return Utils.successJSONObjectBuilder("status_edited", null).build().toString();
    }

    @PostMapping("/housekeeping/editlastname")
    public String editLastName(@RequestParam("user_id") int user_id,
                               @RequestParam("new_lastname") String lastname) throws SQLException {
        if(lastname.equals("")) {
            return Utils.errorJSONObjectBuilder("lastname_length_is_null").build().toString();
        }

        if(!(lastname.matches("[A-Z]{1}[a-z]*(([\\']|[\\-])[A-Z]{1}[a-z]+)?")))
        {
            return Utils.errorJSONObjectBuilder("lastname_not_only_letter").build().toString();
        }
        try (Connection conn = dataSource.getConnection()) {
            CallableStatement editHouseId = conn.prepareCall("UPDATE user SET lastname = ? WHERE user_id = " + user_id);
            editHouseId.setString(1, lastname);
            editHouseId.execute();
        }
        return Utils.successJSONObjectBuilder("lastname_edited", null).build().toString();
    }


    @PostMapping("/housekeeping/edithouse")
    public String editHouseOfUser(@RequestParam("user_id") int user_id,
                                  @RequestParam("new_house_id") int house_id) throws SQLException {

        if(house_id < 1 || house_id > 5) {
            return Utils.errorJSONObjectBuilder("house_id_out_of_bound").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            CallableStatement editHouseId = conn.prepareCall("UPDATE user SET house_id = ? WHERE user_id = " + user_id);
            editHouseId.setInt(1, house_id);
            editHouseId.execute();
        }
        return Utils.successJSONObjectBuilder("house_id_edited", null).build().toString();
    }

    @PostMapping("/housekeeping/desactivate")
    public String desactivateUser(@RequestParam("user_id") int user_id) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            String is_desactivated = "SELECT active AS result FROM user WHERE user_id = " + user_id;
            int active = Utils.getSingletonInt(statement, is_desactivated);

            if (active == 0) {
                return Utils.errorJSONObjectBuilder("user_already_inactive").build().toString();
            }

            CallableStatement deleteSubject = conn.prepareCall("UPDATE user SET active = ? WHERE user_id = " + user_id);
            deleteSubject.setInt(1, 0);
            deleteSubject.execute();
        }
        return Utils.successJSONObjectBuilder("user_desactivated", null).build().toString();
    }
}

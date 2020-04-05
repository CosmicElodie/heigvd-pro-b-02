package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.sql.DataSource;
import java.io.StringReader;
import java.sql.*;

@RestController
public class UserProfileController {

    @Autowired
    private DataSource dataSource;

    @PostMapping("/profile/all")
    public String fetchUser(@RequestParam("user_id") int user_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet user = stmt.executeQuery("select DEV.getUserJSON(" + user_id + ") AS user_result");

            user.next();
            result = user.getString("user_result");
        }
        return result;
    }

    @PostMapping("profile/sign_up")
    public String insertionUser(@RequestParam("birth") Date birth,
                                @RequestParam("email") String email,
                                @RequestParam("firstname") String firstname,
                                @RequestParam("lastname") String lastname,
                                @RequestParam("password") String password,
                                @RequestParam("username") String username,
                                @RequestParam("house_id") int house_id
                                ) throws SQLException {

        JsonObjectBuilder responseObjectError = Json.createObjectBuilder();
        JsonObjectBuilder responseObjectSuccess = Json.createObjectBuilder();

        responseObjectError.add("status", "error");

        boolean isError = false;

        String pattern = "(\\w|-)+\\.(\\w|-)+@heig-vd\\.ch";
        if (!email.matches(pattern)) {
            isError = true;
            responseObjectError.add("dialog_id", "invalid_email_syntax");
        } else {
            try (Connection conn = dataSource.getConnection()) {

                // Test si l'email existe déjà dans la base de donnée.
                if (conn.createStatement().executeQuery(
                        "SELECT user_id FROM user WHERE email LIKE '" + email + "';"
                ).next()) {
                    isError = true;
                    responseObjectError.add("dialog_id", "email_already_exist");
                }
            }
        }

        if (firstname.isEmpty()) {
            isError = true;
            responseObjectError.add("empty1", "empty_firstname");
        }
        if (lastname.isEmpty()) {
            isError = true;
            responseObjectError.add("empty2", "empty_lastname");
        }
        if (username.isEmpty()) {
            isError = true;
            responseObjectError.add("empty3", "empty_username");
        }
        if (password.isEmpty()) {
            isError = true;
            responseObjectError.add("empty4", "empty_password");
        }

        if (isError) {
            return responseObjectError.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertionUser = conn.prepareCall("{CALL insertUser(?,?,?,?,?,?,?)}");
            insertionUser.setDate(1, birth);
            insertionUser.setString(2, email);
            insertionUser.setString(3, firstname);
            insertionUser.setString(4, lastname);
            insertionUser.setString(5, password);
            insertionUser.setString(6, username);
            insertionUser.setInt(7, house_id);

            boolean hasRs = insertionUser.execute();
            if (hasRs) {
                ResultSet rs = insertionUser.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObjectSuccess.add("status", "ok");
                responseObjectSuccess.add("dialog_id", "user_created");
                responseObjectSuccess.add("data", reader.readValue());
            }
        }
        return responseObjectSuccess.build().toString();
    }

    @PostMapping("profile/update")
    public String updateUser(@RequestParam("user_id") int user_id,
                             @RequestParam("birth") Date birth,
                             @RequestParam("firstname") String firstname,
                             @RequestParam("lastname") String lastname,
                             @RequestParam("password") String password,
                             @RequestParam("username") String username,
                             @RequestParam("avatar") String avatar
                             ) throws SQLException {

        JsonObjectBuilder responseObjectError = Json.createObjectBuilder();
        JsonObjectBuilder responseObjectSuccess = Json.createObjectBuilder();

        responseObjectError.add("status", "error");

        boolean isError = false;

        if (firstname.isEmpty()) {
            isError = true;
            responseObjectError.add("empty1", "empty_firstname");
        }
        if (lastname.isEmpty()) {
            isError = true;
            responseObjectError.add("empty2", "empty_lastname");
        }
        if (username.isEmpty()) {
            isError = true;
            responseObjectError.add("empty3", "empty_username");
        }
        if (password.isEmpty()) {
            isError = true;
            responseObjectError.add("empty4", "empty_password");
        }

        if (isError) {
            return responseObjectError.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement updateUser = conn.prepareCall("{CALL updateUser(?,?,?,?,?,?,?)}");
            updateUser.setInt(1, user_id);
            updateUser.setDate(2, birth);
            updateUser.setString(3, firstname);
            updateUser.setString(4, lastname);
            updateUser.setString(5, password);
            updateUser.setString(6, username);
            updateUser.setString(7, avatar);
            updateUser.execute();

            responseObjectSuccess.add("status", "ok");
            responseObjectSuccess.add("dialog_id", "user_updated");
        }
        return responseObjectSuccess.build().toString();
    }

    @PostMapping("profile/delete")
    public String deleteUser(@RequestParam("user_id") int user_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement deleteUser = conn.prepareCall("{CALL deleteUser(?)}");
            deleteUser.setInt(1, user_id);
            deleteUser.execute();

            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "user_deactivated");
        }
        return responseObject.build().toString();
    }
}

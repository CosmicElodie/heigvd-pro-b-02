package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.sql.DataSource;
import java.io.*;
import java.sql.*;
import java.util.Base64;

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

        if (password.isEmpty()) {
            isError = true;
            responseObjectError.add("empty4", "empty_password");
        }

        if (isError) {
            return responseObjectError.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertionUser = conn.prepareCall("{CALL insertUser(?,?,?,?,?,?)}");
            insertionUser.setDate(1, birth);
            insertionUser.setString(2, email);
            insertionUser.setString(3, firstname);
            insertionUser.setString(4, lastname);
            insertionUser.setString(5, password);
            insertionUser.setInt(6, house_id);

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

    @PostMapping("profile/update_avatar")
    public String updateUserAvatar(@RequestParam("user_id") int user_id,
                                   @RequestParam("img_name") String img_name,
                             @RequestParam("avatar") String img
                             ) throws SQLException {


        JsonObjectBuilder responseObject = Json.createObjectBuilder();
    if ( img_name.isEmpty() || img.isEmpty() || img.equals("undefined") || img_name.equals("undefined")){
        responseObject.add("status", "failed");
        return responseObject.build().toString();
    }

        /*****************************************************************************/
        String base64Image = img.split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
        img = img.replaceAll(" ", "+");
        String[] strings = img.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/jpeg;base64":
                extension = ".jpeg";
                break;
            case "data:image/png;base64":
                extension = ".png";
                break;
            default://should write cases for more images types
                extension = ".jpg";
                break;
        }
        byte[] data = Base64.getDecoder().decode(strings[1]);
        String path =  "src\\main\\resources\\static\\" + img_name + extension;
        System.out.println(path);
        File file = new File(path);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file,false))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
            responseObject.add("status", "error");
            responseObject.add("empty", "error_while_storing_file");
            return responseObject.build().toString();
        }

        String avatar = "http://localhost:8080/content/"+ img_name + extension;
        /*****************************************************************************/

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement updateUser = conn.prepareCall("{CALL updateUserAvatar(?,?)}");
            updateUser.setInt(1, user_id);
            updateUser.setString(2, avatar);
            updateUser.execute();

            //JsonObjectBuilder responseObject = Json.createObjectBuilder();
            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "user_avatar_updated");
            responseObject.add("img_path", avatar);
            return responseObject.build().toString();
        }
    }

    @PostMapping("profile/update_password")
    public String updateUserPassword(@RequestParam("user_id") int user_id,
                             @RequestParam("old_password") String old_password,
                             @RequestParam("new_password") String new_password
    ) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

            // Test si ancien mot de passe est correcte.
            if (!conn.createStatement().executeQuery(
                    "SELECT user_id FROM user WHERE user_id = '" + user_id + "' and password = '" + old_password + "';"
            ).next()) {

                JsonObjectBuilder responseObject = Json.createObjectBuilder();
                responseObject.add("status", "error");
                responseObject.add("dialog_id", "old_password_invalid");
                return responseObject.build().toString();
            }
        }

        if (new_password.isEmpty()) {
            JsonObjectBuilder responseObject = Json.createObjectBuilder();
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "empty_password");
            return responseObject.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement updateUser = conn.prepareCall("{CALL updateUserPassword(?,?)}");
            updateUser.setInt(1, user_id);
            updateUser.setString(2, new_password);
            updateUser.execute();

            JsonObjectBuilder responseObject = Json.createObjectBuilder();
            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "user_password_updated");
            return responseObject.build().toString();
        }

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

package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
public class UserProfileController {

    @Autowired
    private DataSource dataSource;

    @PostMapping("/profile")
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
}

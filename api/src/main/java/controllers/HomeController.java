package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.json.JsonObjectBuilder;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Controller
public class HomeController {
    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }

    @Autowired
    private DataSource dataSource;

    @GetMapping("/profile/all")
    public String getUser() throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int user_id = user.getId();
        String result;


        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet userId = stmt.executeQuery("select DEV.getUserJSON(" + user_id + ") AS user_result");

            userId.next();
            result = userId.getString("user_result");
        }
        return result;
    }
}

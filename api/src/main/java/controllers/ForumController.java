package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
public class ForumController {
    @Autowired
    private DataSource dataSource;

    private Connection mConnection;

    @GetMapping("/forum/all")
    public String forumList() throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

        }


        return null;
    }

}

package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.json.Json;
import javax.sql.DataSource;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
public class RankingController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/auditoire/yearly")
    public String rankingAnnually(@RequestParam("house_id") int house_id) throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.`getRankingByHouse`(1," + house_id + ") AS result");

            forums.next();
            result = forums.getString("result");
        }
        return result;
    }

    @GetMapping("/auditoire/monthly")
    public String rankingMonthly(@RequestParam("house_id") int house_id) throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getRankingByHouse(0," + house_id + ") AS result");

            forums.next();
            result = forums.getString("result");
        }
        return result;
    }
}

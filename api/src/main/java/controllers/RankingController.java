package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
public class RankingController {
    @Autowired
    private DataSource dataSource;

    @PostMapping("/auditoire/yearly")
    public String rankingAnnually(@RequestParam("house_id") int house_id) throws SQLException {

        String result;

        //House id > 0
        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.`getRankingByHouse`(1," + house_id + ") AS result");

            forums.next();
            result = forums.getString("result");
        }
        return result;
    }

    @PostMapping("/auditoire/monthly")
    public String rankingMonthly(@RequestParam("house_id") int house_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getRankingByHouse(0," + house_id + ") AS result");

            forums.next();
            result = forums.getString("result");
        }
        return result;
    }


    @PostMapping("/auditoire/palmares")
    public String housePalmares() throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet housePalmares =
                    stmt.executeQuery("select DEV.getPalmares() AS result");

            housePalmares.next();
            result = housePalmares.getString("result");
        }
        return result;
    }
}

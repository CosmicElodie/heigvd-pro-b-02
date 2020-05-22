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
public class HouseController {
    @Autowired
    private DataSource dataSource;

    @PostMapping("/house/detail")
    public String houseDetail(@RequestParam("house_id") int house_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet houseDetail = stmt.executeQuery("select DEV.getHouseDetailJSON(" + house_id + ") AS result");

            houseDetail.next();
            result = houseDetail.getString("result");
        }
        return result;
    }

    @PostMapping("/house/latestPost")
    public String houseLatestPost(@RequestParam("house_id") int house_id,
                                  @RequestParam("nbPosts") int nbPosts) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet houseDetail =
                    stmt.executeQuery("select DEV.getLatestPostJson(" + house_id + "," + nbPosts + ") AS result");

            houseDetail.next();
            result = houseDetail.getString("result");
        }
        return result;
    }

    @PostMapping("/house/topUser/yearly")
    public String houseTopUserYearly(@RequestParam("house_id") int house_id) throws SQLException {

        String result;

        //if house_id == 0 ? return error
        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet houseDetail =
                    stmt.executeQuery("select DEV.`getRankingByHouse`(1," + house_id + ") AS result");

            houseDetail.next();
            result = houseDetail.getString("result");
        }
        return result;
    }

    @PostMapping("/house/topUser/monthly")
    public String houseTopUserMonthly(@RequestParam("house_id") int house_id) throws SQLException {

        String result;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet houseDetail =
                    stmt.executeQuery("select DEV.`getRankingByHouse`(0," + house_id + ") AS result");

            houseDetail.next();
            result = houseDetail.getString("result");
        }
        return result;
    }

    @PostMapping("/house/palmares")
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

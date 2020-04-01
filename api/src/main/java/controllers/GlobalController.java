package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.json.Json;
import javax.sql.DataSource;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
public class GlobalController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/global/data")
    public String globalData() throws SQLException {
        String out;
        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select DEV.getGlobalDataJSON() AS result");
            rs.next();
            out = rs.getString("result");
        }

        return Json.createReader(new StringReader(out)).readValue().toString();
    }
}

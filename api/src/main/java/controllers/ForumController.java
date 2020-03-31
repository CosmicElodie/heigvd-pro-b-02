package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.*;

@RestController
public class ForumController {
    @Autowired
    private DataSource dataSource;

    @GetMapping("/forum/all")
    public String forumList() throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getForums() AS forum_result");

            forums.next();
            result = forums.getString("forum_result");
        }
        return result;
    }


    ///////////////////////////////////////////////// INSERTION PART ////////////////////////////////////

    //TODO : get informations from FrontEnd
    @GetMapping("forum/testInsSec")
    public void insertionSection(@RequestParam("name") String title, @RequestParam("description") String desc,
                              @RequestParam("parent_forum_section_id") int parent,
                              @RequestParam("house_id") int house) throws SQLException {

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSection = conn.prepareCall("{call DEV.insertSection(?,?,?,?)}");
            insertSection.setString(1, title);
            insertSection.setString(2, desc);
            insertSection.setInt(3, parent);
            insertSection.setString(4, (String) (house == 0 ? "NULL" : house));
            insertSection.executeUpdate();

        }
    }

    //TODO: get informations from FrontEnd

    @GetMapping("forum/testInsSub")
    public void insertionSubject(@RequestParam("name") String title, @RequestParam("forum_section_id") int sectionId,
                              @RequestParam("user_id") int userId,
                              @RequestParam("message") String message ) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSubject = conn.prepareCall("{CALL insertSubject(?,?,?,?)}");
            insertSubject.setString(1, title);
            insertSubject.setInt(2, sectionId);
            insertSubject.setInt(3, userId);
            insertSubject.setString(4,message);
            insertSubject.executeUpdate();
        }
    }

    @GetMapping("forum/testInsPost")
    public void insertionPost(@RequestParam("message") String message, @RequestParam("forum_section_id") int section_id,
                           @RequestParam("user_id") int user_id) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSubject = conn.prepareCall("{CALL insertPost(?,?,?,?)}");
            insertSubject.setString(1, message);
            insertSubject.setInt(2, section_id);
            insertSubject.setInt(3, user_id);
            insertSubject.executeUpdate();
        }
    }

    ///////////////////////////////////////////////// UPDATE PART ////////////////////////////////////
    public void updatePost(@RequestParam("forum_post_id") int post_id,
                           @RequestParam("message") String message) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSubject = conn.prepareCall("{CALL insertPost(?,?,?,?)}");
            insertSubject.setInt(1, post_id);
            insertSubject.setString(2, message);
            insertSubject.executeUpdate();
        }
    }


    @GetMapping("/forum/user")
    public String fetchMe(@RequestParam("user_id") int user_id) throws SQLException {

        String result = null;

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getUserJSON(" + user_id + ") AS forum_result");

            forums.next();
            result = forums.getString("forum_result");
        }
        return result;
    }

}

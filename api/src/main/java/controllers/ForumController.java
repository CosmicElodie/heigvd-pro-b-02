package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
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
    @PostMapping("forum/insert_section")
    public String insertionSection(@RequestParam("name") String title, @RequestParam("description") String desc,
                              @RequestParam(value  = "parent_forum_section_id", required = false) Integer parent,
                              @RequestParam(value  = "house_id", required = false) Integer house) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        if(title.length() < 10 || desc.length() < 10){
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(user.getAccessLevel() < 75){
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "forum_insert_insufficient_permission");
            return responseObject.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSection = conn.prepareCall("{call DEV.insertSection(?,?,?,?)}");
            insertSection.setString(1, title);
            insertSection.setString(2, desc);

            if(parent == null){
                insertSection.setNull(3, Types.INTEGER);
            }else{
                insertSection.setInt(3, parent);
            }

            if(house == null){
                insertSection.setNull(4, Types.INTEGER);
            }else{
                insertSection.setInt(4, house);
            }

            boolean hasRs = insertSection.execute();
            if (hasRs) {
                ResultSet rs = insertSection.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject.add("status", "ok");
                responseObject.add("dialog_id", "forum_created");
                responseObject.add("data", reader.readValue());
            }
        }
        return responseObject.build().toString();

    }

    //TODO: get informations from FrontEnd

    @GetMapping("forum/testInsSub")
    public String insertionSubject(@RequestParam("name") String title,
                                   @RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        if(title.length() < 10){
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSubject = conn.prepareCall("{CALL insertSubject(?,?,?)}");
            insertSubject.setString(1, title);
            insertSubject.setInt(2, section_id);
            insertSubject.setInt(3, user.getId());
            insertSubject.executeUpdate();

            boolean hasRs = insertSubject.execute();
            if (hasRs) {
                ResultSet rs = insertSubject.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject.add("status", "ok");
                responseObject.add("dialog_id", "subject_created");
                responseObject.add("data", reader.readValue());
            }
        }
        return responseObject.build().toString();

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

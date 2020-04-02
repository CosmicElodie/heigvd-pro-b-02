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

    //TODO : get informations from FrontEnd
    @PostMapping("forum/insert_section")
    public String insertionSection(@RequestParam("name") String title, @RequestParam("description") String desc,
                                   @RequestParam(value = "parent_forum_section_id", required = false) Integer parent,
                                   @RequestParam(value = "house_id", required = false) Integer house) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        if (title.length() == 0 || desc.length() == 0) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getAccessLevel() < 75) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "forum_insert_insufficient_permission");
            return responseObject.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSection = conn.prepareCall("{call DEV.insertSection(?,?,?,?)}");
            insertSection.setString(1, title);
            insertSection.setString(2, desc);

            if (parent == null) {
                insertSection.setNull(3, Types.INTEGER);
            } else {
                insertSection.setInt(3, parent);
            }

            if (house == null) {
                insertSection.setNull(4, Types.INTEGER);
            } else {
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

    @PostMapping("forum/insert_subject")
    public String insertionSubject(@RequestParam("name") String title,
                                   @RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        if (title.length() == 0) {
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

    @PostMapping("forum/insert_post")
    public String insertionPost(@RequestParam("message") String message, @RequestParam("forum_subject_id") int subject_id) throws SQLException {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        if (message.length() == 0) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertionPost = conn.prepareCall("{CALL insertPost(?,?,?)}");
            insertionPost.setString(1, message);
            insertionPost.setInt(2, subject_id);
            insertionPost.setInt(3, user.getId());

            boolean hasRs = insertionPost.execute();
            if (hasRs) {
                ResultSet rs = insertionPost.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject.add("status", "ok");
                responseObject.add("dialog_id", "post_created");
                responseObject.add("data", reader.readValue());
            }
        }
        return responseObject.build().toString();
    }

    ///////////////////////////////////////////////// UPDATE PART ////////////////////////////////////

    @PostMapping("forum/update_section")
    public String updateSection(@RequestParam("name") String title,
                                @RequestParam("description") String desc,
                                @RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        if (title.length() == 0 || desc.length() == 0) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getAccessLevel() < 75) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "forum_insert_insufficient_permission");
            return responseObject.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement updateSection = conn.prepareCall("{CALL updateSection(?,?,?)}");
            updateSection.setString(1, title);
            updateSection.setString(2, desc);
            updateSection.setInt(3, section_id);
            updateSection.execute();
            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "forum_updated");

        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/update_subject")
    public String updateSubject(@RequestParam("name") String title,
                                @RequestParam("forum_subject_id") int subject_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        if (title.length() == 0) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String test = "SELECT user_id FROM forum_subject WHERE forum_subject_id = " + subject_id;
            int user_id = statement.executeQuery(test).getInt("user_id");

            if (user.getId() != user_id) {
                responseObject.add("status", "error");
                responseObject.add("dialog_id", "forum_update_wrong_creator");
                return responseObject.build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL updateSection(?,?)}");
            updateSubject.setString(1, title);
            updateSubject.setInt(2, subject_id);
            updateSubject.execute();

            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "subject_updated");

        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/update_post")
    public String updatePost(@RequestParam("forum_post_id") int post_id,
                             @RequestParam("message") String message) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        if (message.length() == 0) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "insufficient_input_length");
            return responseObject.build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String test = "SELECT user_id FROM forum_post WHERE forum_post_id = " + post_id;

            ResultSet rs = statement.executeQuery(test);
            rs.next();
            int user_id = rs.getInt("user_id");

            if (user.getId() != user_id) {
                responseObject.add("status", "error");
                responseObject.add("dialog_id", "forum_update_wrong_creator");
                return responseObject.build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL updatePost(?,?)}");
            updateSubject.setString(1, message);
            updateSubject.setInt(2, post_id);
            updateSubject.execute();

            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "post_updated");
        }
        return responseObject.build().toString();
    }

    ///////////////////////////////////////////// DELETE PART ///////////////////////////////////////
    @PostMapping("forum/delete_section")
    public String deleteSection(@RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getAccessLevel() < 75) {
            responseObject.add("status", "error");
            responseObject.add("dialog_id", "forum_delete_insufficient_permission");
            return responseObject.build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            CallableStatement deleteSection = conn.prepareCall("{CALL deleteSection(?)}");
            deleteSection.setInt(1, section_id);
            deleteSection.execute();
            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "forum_deleted");
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/delete_subject")
    public String deleteSubject(@RequestParam("forum_subject_id") int subject_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String test = "SELECT user_id FROM forum_subject WHERE forum_subject_id = " + subject_id;
            int user_id = statement.executeQuery(test).getInt("user_id");

            if (user.getId() != user_id) {
                responseObject.add("status", "error");
                responseObject.add("dialog_id", "forum_delete_wrong_creator");
                return responseObject.build().toString();
            }

            CallableStatement deleteSubject = conn.prepareCall("{CALL deleteSection(?)}");
            deleteSubject.setInt(1, subject_id);
            deleteSubject.execute();

            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "subject_deleted");

        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/delete_post")
    public String deletePost(@RequestParam("forum_post_id") int post_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String test = "SELECT user_id FROM forum_post WHERE forum_post_id = " + post_id;

            ResultSet rs = statement.executeQuery(test);
            rs.next();
            int user_id = rs.getInt("user_id");

            if (user.getId() != user_id) {
                responseObject.add("status", "error");
                responseObject.add("dialog_id", "forum_update_wrong_creator");
                return responseObject.build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL deletePost(?)}");
            updateSubject.setInt(1, post_id);
            updateSubject.execute();

            responseObject.add("status", "ok");
            responseObject.add("dialog_id", "post_updated");
        }
        return responseObject.build().toString();
    }
}
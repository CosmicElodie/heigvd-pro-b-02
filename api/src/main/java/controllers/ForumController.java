package controllers;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import utils.Utils;

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

        String result;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        int house_id = user.getHouseID();
        int access_level = user.getAccessLevel();

        try (Connection conn = dataSource.getConnection()) {
            Statement stmt = conn.createStatement();
            ResultSet forums = stmt.executeQuery("select DEV.getForums(" + access_level + "," + house_id + ") AS forum_result");

            forums.next();
            result = forums.getString("forum_result");
            result = (result == null) ? "[]" : result;
        }
        return result;
    }

    ///////////////////////////////////////////////// INSERT PART /////////////////////////////////////////////////
    @PostMapping("forum/insert_section")
    public String insertionSection(@RequestParam("name") String title, @RequestParam("description") String desc,
                                   @RequestParam(value = "parent_forum_section_id", required = false) Integer parent,
                                   @RequestParam(value = "house_id", required = false) Integer house,
                                   @RequestParam("help") boolean help) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (title.length() == 0 || desc.length() == 0) {
            return Utils.errorJSONObjectBuilder("insufficient_input_length").build().toString();
        }

        if (user.getAccessLevel() < 75) {
            return Utils.errorJSONObjectBuilder("forum_insert_insufficient_permission").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {

            CallableStatement insertSection = conn.prepareCall("{call DEV.insertSection(?,?,?,?,?)}");
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

            insertSection.setBoolean(5, help);

            boolean hasRs = insertSection.execute();
            if (hasRs) {
                ResultSet rs = insertSection.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject = Utils.successJSONObjectBuilder("event_created", reader);
            }
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/insert_subject")
    public String insertionSubject(@RequestParam("name") String title,
                                   @RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (title.length() == 0) {
            return Utils.errorJSONObjectBuilder("insufficient_input_length").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String sqlGetSubjectHouseID = "SELECT house_id as RESULT FROM forum_section WHERE forum_section_id =" + section_id;
            String sqlGetSubjectAccessID = "SELECT access_level as RESULT FROM forum_section WHERE forum_section_id =" + section_id;

            int subjectHouseId = Utils.getSingletonInt(statement, sqlGetSubjectHouseID);
            int subjectAccessLevel = Utils.getSingletonInt(statement, sqlGetSubjectAccessID);

            boolean isAllowedOperation = ((user.getHouseID() == subjectHouseId || subjectHouseId == 0) &&
                    (user.getAccessLevel() >= subjectAccessLevel)) || (user.getAccessLevel() >= 50);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("wrong_house_or_access_insert_subject_permission").build().toString();
            }

            CallableStatement insertSubject = conn.prepareCall("{CALL insertSubject(?,?,?)}");
            insertSubject.setString(1, title);
            insertSubject.setInt(2, section_id);
            insertSubject.setInt(3, user.getId());

            boolean hasRs = insertSubject.execute();
            if (hasRs) {
                ResultSet rs = insertSubject.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject = Utils.successJSONObjectBuilder("subject_created", reader);
            }
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/insert_post")
    public String insertionPost(@RequestParam("message") String message,
                                @RequestParam("forum_subject_id") int subject_id) throws SQLException {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (message.length() == 0) {
            return Utils.errorJSONObjectBuilder("insufficient_input_length").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();
            String sqlGetSubjectHouseID = "SELECT house_id as RESULT FROM forum_section " +
                    "INNER JOIN forum_subject USING (forum_section_id) WHERE forum_subject_id =" + subject_id;
            String sqlGetSubjectAccessID = "SELECT access_level as RESULT FROM forum_section " +
                    "INNER JOIN forum_subject USING (forum_section_id) WHERE forum_subject_id =" + subject_id;


            int subjectHouseId = Utils.getSingletonInt(statement, sqlGetSubjectHouseID); //null
            int subjectAccessLevel = Utils.getSingletonInt(statement, sqlGetSubjectAccessID); // 0

            boolean isAllowedOperation = ((user.getHouseID() == subjectHouseId || subjectHouseId == 0) && (user.getAccessLevel() >= subjectAccessLevel)) ||
                    (user.getAccessLevel() >= 50);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("wrong_house_or_access_insert_post_permission").build().toString();
            }
            CallableStatement insertionPost = conn.prepareCall("{CALL insertPost(?,?,?)}");
            insertionPost.setString(1, message);
            insertionPost.setInt(2, subject_id);
            insertionPost.setInt(3, user.getId());

            boolean hasRs = insertionPost.execute();
            if (hasRs) {
                ResultSet rs = insertionPost.getResultSet();
                rs.next();
                JsonReader reader = Json.createReader(new StringReader(rs.getString("result")));
                responseObject = Utils.successJSONObjectBuilder("post_created", reader);
            }
        }
        return responseObject.build().toString();
    }

    ///////////////////////////////////////////////// UPDATE PART /////////////////////////////////////////////////

    @PostMapping("forum/update_section")
    public String updateSection(@RequestParam("name") String title,
                                @RequestParam("description") String desc,
                                @RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (title.length() == 0 || desc.length() == 0) {
            return Utils.errorJSONObjectBuilder("insufficient_input_length").build().toString();
        }

        if (user.getAccessLevel() < 75) {
            return Utils.errorJSONObjectBuilder("forum_insert_insufficient_permission").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            CallableStatement updateSection = conn.prepareCall("{CALL updateSection(?,?,?)}");
            updateSection.setString(1, title);
            updateSection.setString(2, desc);
            updateSection.setInt(3, section_id);
            updateSection.execute();
            responseObject = Utils.successJSONObjectBuilder("forum_updated", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/update_subject")
    public String updateSubject(@RequestParam("name") String title,
                                @RequestParam("forum_subject_id") int subject_id) throws SQLException {

        JsonObjectBuilder responseObject;

        if (title.length() == 0 || title.length() >= 100) {
            return Utils.errorJSONObjectBuilder("incorrect_input_length").build().toString();
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int postOwnerUserId = Utils.getSingletonInt(statement, Utils.getSubjectOwnerFromSubject(subject_id));
            int postHouseId = Utils.getSingletonInt(statement, Utils.getHouseID(subject_id));

            boolean isAllowedOperation = user.getId() == postOwnerUserId ||
                    (user.getId() != postOwnerUserId && user.getAccessLevel() >= 75) ||
                    (user.getId() != postOwnerUserId && user.getHouseID() == postHouseId && user.getAccessLevel() >= 25);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("subject_update_insufficient_permission").build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL updateSubject(?,?)}");
            updateSubject.setString(1, title);
            updateSubject.setInt(2, subject_id);
            updateSubject.execute();

            responseObject = Utils.successJSONObjectBuilder("subject_updated", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/update_post")
    public String updatePost(@RequestParam("forum_post_id") int post_id,
                             @RequestParam("message") String message) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (message.length() == 0) {
            return Utils.errorJSONObjectBuilder("insufficient_input_length").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            String sqlGetOwnerID = Utils.getPostOwnerID(post_id);
            String sqlGetPostHouseID = "SELECT house_id as result FROM forum_section\n" +
                    "INNER JOIN forum_subject using(forum_section_id)\n" +
                    "INNER JOIN forum_post using(forum_subject_id)\n" +
                    "WHERE forum_post.forum_post_id = " + post_id;

            int postOwnerUserId = Utils.getSingletonInt(statement, sqlGetOwnerID);
            int postHouseId = Utils.getSingletonInt(statement, sqlGetPostHouseID); //?????

            boolean isAllowedOperation = user.getId() == postOwnerUserId ||
                    (user.getId() != postOwnerUserId && user.getAccessLevel() >= 75) ||
                    (user.getId() != postOwnerUserId && user.getHouseID() == postHouseId && user.getAccessLevel() >= 25);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("post_update_insufficient_permission").build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL updatePost(?,?)}");
            updateSubject.setString(1, message);
            updateSubject.setInt(2, post_id);
            updateSubject.execute();

            responseObject = Utils.successJSONObjectBuilder("post_updated", null);
        }
        return responseObject.build().toString();
    }

    ///////////////////////////////////////////////// DELETE PART /////////////////////////////////////////////////
    @PostMapping("forum/delete_section")
    public String deleteSection(@RequestParam("forum_section_id") int section_id) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getAccessLevel() < 75) {
            return Utils.errorJSONObjectBuilder("forum_delete_insufficient_permission").build().toString();
        }

        try (Connection conn = dataSource.getConnection()) {
            CallableStatement deleteSection = conn.prepareCall("{CALL deleteSection(?)}");
            deleteSection.setInt(1, section_id);
            deleteSection.execute();

            responseObject = Utils.successJSONObjectBuilder("forum_deleted", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/delete_subject")
    public String deleteSubject(@RequestParam("forum_subject_id") int subject_id) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int postOwnerUserId = Utils.getSingletonInt(statement, Utils.getSubjectOwnerFromSubject(subject_id));
            int postHouseId = Utils.getSingletonInt(statement, Utils.getHouseID(subject_id));

            boolean isAllowedOperation =
                    user.getId() == postOwnerUserId ||
                            (user.getId() != postOwnerUserId && user.getAccessLevel() >= 50) ||
                            (user.getId() != postOwnerUserId && user.getHouseID() == postHouseId && user.getAccessLevel() >= 25);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("subject_delete_insufficient_permission").build().toString();
            }

            CallableStatement deleteSubject = conn.prepareCall("{CALL deleteSubject(?)}");
            deleteSubject.setInt(1, subject_id);
            deleteSubject.execute();

            responseObject = Utils.successJSONObjectBuilder("subject_deleted", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/delete_post")
    public String deletePost(@RequestParam("forum_post_id") int post_id) throws SQLException {

        JsonObjectBuilder responseObject;

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            String sqlGetPostHouseID = "SELECT house_id as result FROM forum_section\n" +
                    "INNER JOIN forum_subject using(forum_section_id)\n" +
                    "INNER JOIN forum_post using(forum_subject_id)\n" +
                    "WHERE forum_post.forum_post_id = " + post_id;

            int postHouseId = Utils.getSingletonInt(statement, sqlGetPostHouseID);
            int postOwnerUserId = Utils.getSingletonInt(statement, Utils.getPostOwnerID(post_id));

            boolean isAllowedOperation =
                    user.getId() == postOwnerUserId ||
                            (user.getId() != postOwnerUserId && user.getAccessLevel() >= 50) ||
                            (user.getId() != postOwnerUserId && user.getHouseID() == postHouseId && user.getAccessLevel() >= 25);

            if (!isAllowedOperation) {
                return Utils.errorJSONObjectBuilder("post_delete_insufficient_permission").build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL deletePost(?)}");
            updateSubject.setInt(1, post_id);
            updateSubject.execute();
            responseObject = Utils.successJSONObjectBuilder("post_deleted", null);
        }
        return responseObject.build().toString();
    }

    ///////////////////////////////////////////////// ANSWER PART /////////////////////////////////////////////////
    @PostMapping("forum/set_best_answer")
    public String subjectSolved(@RequestParam("forum_post_id") int post_id) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int subjectOwnerUserId = Utils.getSingletonInt(statement, Utils.getSubjectOwnerIDFromPost(post_id));
            int postOwnerUserId = Utils.getSingletonInt(statement, Utils.getPostOwnerID(post_id));
            int subjectId = Utils.getSingletonInt(statement, Utils.getSubjectID(post_id));
            int statusPost = Utils.getSingletonInt(statement, Utils.getStatusPost(post_id));
            int statusSubject = Utils.getSingletonInt(statement, Utils.getStatusSubject(post_id));
            int helpSection = Utils.getSingletonInt(statement, Utils.getHelpSection(post_id));

            if (user.getId() != subjectOwnerUserId) {
                return Utils.errorJSONObjectBuilder("wrong_author_subject_solved").build().toString();
            }

            if (user.getId() == postOwnerUserId) {
                return Utils.errorJSONObjectBuilder("same_author_post_subject_solved").build().toString();
            }

            if (statusPost == 1 || statusSubject == 1) {
                return Utils.errorJSONObjectBuilder("subject_or_post_already_solved").build().toString();
            }

            if (!(helpSection == 1)) {
                return Utils.errorJSONObjectBuilder("not_in_help_section").build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL answerPost(?)}");
            updateSubject.setInt(1, post_id);
            updateSubject.execute();

            CallableStatement updatePost = conn.prepareCall("{CALL answerSubject(?)}");
            updatePost.setInt(1, subjectId);
            updatePost.execute();

            responseObject = Utils.successJSONObjectBuilder("solved_post_and_subject", null);
        }
        return responseObject.build().toString();
    }

    @PostMapping("forum/unset_best_answer")
    public String subjectUnsolved(@RequestParam("forum_post_id") int post_id) throws SQLException {

        JsonObjectBuilder responseObject;
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            Statement statement = conn.createStatement();

            int subjectOwnerUserId = Utils.getSingletonInt(statement, Utils.getSubjectOwnerIDFromPost(post_id));
            int subject_id = Utils.getSingletonInt(statement, Utils.getSubjectID(post_id));
            int postOwnerUserId = Utils.getSingletonInt(statement, Utils.getPostOwnerID(post_id));
            int statusPost = Utils.getSingletonInt(statement, Utils.getStatusPost(post_id));
            int statusSubject = Utils.getSingletonInt(statement, Utils.getStatusSubject(post_id));
            int helpSection = Utils.getSingletonInt(statement, Utils.getHelpSection(post_id));

            if (user.getId() != subjectOwnerUserId) {
                return Utils.errorJSONObjectBuilder("wrong_author_subject_unsolved").build().toString();
            }
            
            if (!(statusPost == 1 || statusSubject == 1)) {
                return Utils.errorJSONObjectBuilder("subject_or_post_already_unsolved").build().toString();
            }

            if (!(helpSection == 1)) {
                return Utils.errorJSONObjectBuilder("not_in_help_section").build().toString();
            }

            CallableStatement updateSubject = conn.prepareCall("{CALL unanswerPost(?)}");
            updateSubject.setInt(1, post_id);
            updateSubject.execute();

            CallableStatement updatePost = conn.prepareCall("{CALL unanswerSubject(?)}");
            updatePost.setInt(1, subject_id);
            updatePost.execute();

            responseObject = Utils.successJSONObjectBuilder("unsolved_post_and_subject", null);
        }
        return responseObject.build().toString();
    }
}
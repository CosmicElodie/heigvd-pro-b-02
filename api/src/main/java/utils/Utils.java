package utils;

import org.json.JSONException;
import org.json.JSONObject;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Utils {

    public static int getSingletonInt(Statement statement, String sql) throws SQLException {
        ResultSet rs = statement.executeQuery(sql);
        rs.next();
        return rs.getInt("result");
    }

    public static JSONObject mergeJSON(JSONObject obj1, JSONObject obj2){
        JSONObject merged = new JSONObject();
        try{
            merged = new JSONObject(obj1, JSONObject.getNames(obj1));
            for(String crunchKey : JSONObject.getNames(obj2)){
                merged.put(crunchKey, obj2.get(crunchKey));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return merged;
    }

    public static JsonObjectBuilder errorJSONObjectBuilder(String errorMessage) {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        responseObject.add("status", "error");
        responseObject.add("dialog_id", errorMessage);
        return responseObject;
    }

    public static JsonObjectBuilder successJSONObjectBuilder(String successMessage, JsonReader reader) {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        responseObject.add("status", "ok");
        responseObject.add("dialog_id", successMessage);
        if(reader != null) {
            responseObject.add("data", reader.readValue());
        }
        return responseObject;
    }

    //Useful methods below for unset/set best answer
    public static String getSubjectOwnerIDFromPost(int post_id) {
        return "SELECT forum_subject.user_id as result " +
                "FROM forum_subject " +
                "INNER JOIN forum_post USING(forum_subject_id) " +
                "WHERE forum_post.forum_post_id = " + post_id;
    }

    public static String getSubjectOwnerFromSubject(int subject_id) {
        return "SELECT user_id as result FROM forum_subject WHERE forum_subject_id = " + subject_id;
    }

    public static String getPostOwnerID(int post_id) {
        return "SELECT user_id as result FROM forum_post WHERE forum_post_id = " + post_id;

    }

    public static String getSubjectID(int post_id){
        return "SELECT forum_subject_id as result FROM forum_post WHERE forum_post_id = " + post_id;
    }

    public static String getStatusPost(int post_id) {
        return "SELECT subject_answer as result FROM forum_post WHERE forum_post_id = " + post_id;
    }

    public static String getHelpSection(int post_id) {
        return "SELECT help_section as result FROM forum_section " +
                "INNER JOIN forum_subject USING (forum_section_id)" +
                "INNER JOIN forum_post USING (forum_subject_id) WHERE forum_post_id = " + post_id;
    }

    public static String getStatusSubject(int post_id) {
        return  "SELECT resolved as result FROM forum_subject " +
                "INNER JOIN forum_post USING (forum_subject_id) " +
                "WHERE forum_post.forum_post_id = " + post_id;
    }

    public static String getHouseID(int subject_id) {
        return "SELECT house_id as result FROM forum_section\n" +
                "INNER JOIN forum_subject using(forum_section_id)\n" +
                "WHERE forum_subject.forum_subject_id = " + subject_id;
    }


    public static String getPointsEvents(int difficulty, int place) {
        return "SELECT points as result FROM points_difficulty WHERE difficulty = " + difficulty + " AND ranking = " + place;
    }

    public static String getNbParticipant(int house_id, int event_id) {
        return "SELECT COUNT(*) as result FROM user_participate_event\n" +
                "INNER JOIN user USING (user_id)\n" +
                "WHERE house_id = " + house_id +
                " AND event_id = " + event_id;
    }
}
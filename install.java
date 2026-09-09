import java.sql.*;

public class UserSearch {

    public static void findUser(Connection connection, String username) throws SQLException {
        String query = "SELECT * FROM users WHERE username = '" + username + "'";

        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while (result.next()) {
            System.out.println(result.getString("username"));
        }
    }
}

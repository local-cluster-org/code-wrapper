import java.io.*;
import java.nio.file.*;
import java.sql.*;
import java.util.*;
import javax.crypto.Cipher;
import javax.servlet.http.*;
import java.net.*;
import java.util.Base64;

public class SastVulnerabilityDemo {

    // =========================
    // LOW: Hardcoded configurationfsdfsdf
    // =========================
    private static final String DEBUG_MODE = "true";
    private static final String SERVER_URL = "http://example.com";

    // =========================
    // MEDIUM: Hardcoded credentials
    // =========================
    private static final String DB_USER = "admin";
    private static final String DB_PASSWORD = "admin123";
    private static final String API_KEY = "demo-secret-api-key";

    // =========================
    // HIGH: SQL Injection
    // =========================
    public static void findUser(Connection connection, String username)
            throws SQLException {

        String query =
            "SELECT * FROM users WHERE username = '" + username + "'";

        Statement statement = connection.createStatement();
        ResultSet result = statement.executeQuery(query);

        while (result.next()) {
            System.out.println(result.getString("username"));
        }
    }

    // =========================
    // HIGH: OS Command Injection
    // =========================
    public static void executeCommand(String userInput)
            throws IOException {

        Runtime runtime = Runtime.getRuntime();

        Process process = runtime.exec(
            "ping " + userInput
        );

        BufferedReader reader =
            new BufferedReader(
                new InputStreamReader(process.getInputStream())
            );

        String line;

        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }

    // =========================
    // HIGH: Path Traversal
    // =========================
    public static String readFile(String filename)
            throws IOException {

        File file = new File("/tmp/uploads/" + filename);

        BufferedReader reader =
            new BufferedReader(new FileReader(file));

        StringBuilder content = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            content.append(line);
        }

        reader.close();

        return content.toString();
    }

    // =========================
    // HIGH: Unsafe Deserialization
    // =========================
    public static Object deserialize(byte[] data)
            throws IOException, ClassNotFoundException {

        ByteArrayInputStream input =
            new ByteArrayInputStream(data);

        ObjectInputStream objectInput =
            new ObjectInputStream(input);

        return objectInput.readObject();
    }

    // =========================
    // MEDIUM: Weak Cryptography
    // =========================
    public static String encrypt(String value)
            throws Exception {

        Cipher cipher = Cipher.getInstance("DES");

        cipher.init(
            Cipher.ENCRYPT_MODE,
            new javax.crypto.spec.SecretKeySpec(
                "12345678".getBytes(),
                "DES"
            )
        );

        byte[] encrypted =
            cipher.doFinal(value.getBytes());

        return Base64.getEncoder()
            .encodeToString(encrypted);
    }

    // =========================
    // MEDIUM: Insecure Randomness
    // =========================
    public static String generateToken() {

        Random random = new Random();

        return String.valueOf(
            random.nextLong()
        );
    }

    // =========================
    // MEDIUM: SSRF
    // =========================
    public static String fetchUrl(String url)
            throws Exception {

        URL target = new URL(url);

        HttpURLConnection connection =
            (HttpURLConnection) target.openConnection();

        connection.setRequestMethod("GET");

        BufferedReader reader =
            new BufferedReader(
                new InputStreamReader(
                    connection.getInputStream()
                )
            );

        StringBuilder response =
            new StringBuilder();

        String line;

        while ((line = reader.readLine()) != null) {
            response.append(line);
        }

        reader.close();

        return response.toString();
    }

    // =========================
    // MEDIUM: Weak Password Hash
    // =========================
    public static String hashPassword(String password)
            throws Exception {

        java.security.MessageDigest md =
            java.security.MessageDigest.getInstance("MD5");

        byte[] hash =
            md.digest(password.getBytes());

        return Base64.getEncoder()
            .encodeToString(hash);
    }

    // =========================
    // LOW: Sensitive information in logs
    // =========================
    public static void login(String username,
                             String password) {

        System.out.println(
            "Login attempt: username="
            + username
            + " password="
            + password
        );
    }

    // =========================
    // LOW: Debug information
    // =========================
    public static void debug(HttpServletRequest request) {

        System.out.println(
            "Request URL: "
            + request.getRequestURL()
        );

        System.out.println(
            "User-Agent: "
            + request.getHeader("User-Agent")
        );
    }

    // =========================
    // HIGH: XSS
    // =========================
    public static void renderUser(
            HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        String name =
            request.getParameter("name");

        response.setContentType("text/html");

        PrintWriter writer =
            response.getWriter();

        writer.println(
            "<html><body>Hello "
            + name
            + "</body></html>"
        );
    }

    // =========================
    // MEDIUM: Open Redirect
    // =========================
    public static void redirect(
            HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        String destination =
            request.getParameter("url");

        response.sendRedirect(destination);
    }

    // =========================
    // LOW: Permissive CORS
    // =========================
    public static void setCors(
            HttpServletResponse response) {

        response.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );

        response.setHeader(
            "Access-Control-Allow-Credentials",
            "true"
        );
    }

    // =========================
    // HIGH: LDAP Injection
    // =========================
    public static void searchUser(
            String username) {

        String ldapFilter =
            "(&(objectClass=person)(uid="
            + username
            + "))";

        System.out.println(
            "LDAP query: "
            + ldapFilter
        );
    }

    // =========================
    // MEDIUM: Weak TLS configuration
    // =========================
    public static void connect() throws Exception {

        javax.net.ssl.SSLContext context =
            javax.net.ssl.SSLContext.getInstance(
                "SSL"
            );

        context.init(
            null,
            null,
            new java.security.SecureRandom()
        );

        System.out.println(
            "SSL context created"
        );
    }

    // =========================
    // Demo entry point
    // =========================
    public static void main(String[] args)
            throws Exception {

        System.out.println(
            "Starting SAST vulnerability demo"
        );

        System.out.println(
            "API Key: " + API_KEY
        );

        System.out.println(
            "Database user: " + DB_USER
        );

        System.out.println(
            "Debug mode: " + DEBUG_MODE
        );
    }
}

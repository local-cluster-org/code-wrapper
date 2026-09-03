/*
 * JavaScript SAST Engine Rule Test File
 *
 * Purpose:
 * Intentionally vulnerable examples for testing AI query-name detection.
 * Each section is mapped to one expected SAST query name.
 *
 * NOTE: This file is intentionally insecure. Do NOT use in production.
 */

// ============================================================
// 1. Absolute_Path_Traversal
// ============================================================
function absolutePathTraversal(req, res) {
    const fs = require("fs");
    const filePath = "/var/data/" + req.query.file;
    res.send(fs.readFileSync(filePath, "utf8"));
}

// ============================================================
// 2. CSRF
// ============================================================
function csrf(req, res) {
    const user = req.session.user;
    user.email = req.body.email;
    res.send("Email changed");
}

// ============================================================
// 3. Cleartext_Storage_Of_Sensitive_Information
// ============================================================
function cleartextStorage(username, password) {
    const fs = require("fs");
    fs.writeFileSync(
        "credentials.txt",
        "username=" + username + "\npassword=" + password
    );
}

// ============================================================
// 4. Code_Injection
// ============================================================
function codeInjection(req, res) {
    const result = eval(req.query.expression);
    res.send(String(result));
}

// ============================================================
// 5. Command_Injection
// ============================================================
function commandInjection(req, res) {
    const { exec } = require("child_process");

    exec("ping -c 1 " + req.query.host, (error, stdout) => {
        res.send(stdout);
    });
}

// ============================================================
// 6. Comparing_instead_of_Assigning
// ============================================================
function comparingInsteadOfAssigning(user) {
    if (user.role === "admin") {
        user.isAdmin == true;
    }
    return user;
}

// ============================================================
// 7. Cookie_Poisoning
// ============================================================
function cookiePoisoning(req, res) {
    const userRole = req.query.role;

    // User-controlled value is trusted as a security-sensitive cookie.
    res.cookie("role", userRole);
    res.send("Role updated");
}

// ============================================================
// 8. Dangerous_File_Size_Upload
// ============================================================
function dangerousFileSizeUpload(req, res) {
    const multer = require("multer");

    const upload = multer({
        storage: multer.diskStorage({
            destination: "/tmp/uploads"
        })
        // No file-size limit configured.
    }).single("file");

    upload(req, res, function () {
        res.send("Uploaded");
    });
}

// ============================================================
// 9. Divide_By_Zero
// ============================================================
function divideByZero(req, res) {
    const divisor = Number(req.query.divisor);
    const result = 100 / divisor;
    res.send(String(result));
}

// ============================================================
// 10. Dynamic_File_Inclusion
// ============================================================
function dynamicFileInclusion(req, res) {
    const moduleName = req.query.module;
    const module = require("./modules/" + moduleName);
    res.json(module);
}

// ============================================================
// 11. Excessive_Data_Exposure
// ============================================================
function excessiveDataExposure(req, res) {
    db.users.find({}, function (err, users) {
        // Returns complete database objects instead of required fields.
        res.json(users);
    });
}

// ============================================================
// 12. Expression_is_Always_False
// ============================================================
function expressionAlwaysFalse(value) {
    if (value === null && value !== null) {
        console.log("This branch can never execute");
    }
}

// ============================================================
// 13. Expression_is_Always_True
// ============================================================
function expressionAlwaysTrue(value) {
    if (value !== null || value === null) {
        console.log("This condition is always true");
    }
}

// ============================================================
// 14. HTTP_Response_Splitting
// ============================================================
function httpResponseSplitting(req, res) {
    const location = req.query.location;
    res.setHeader("Location", location);
    res.status(302).send();
}

// ============================================================
// 15. Hardcoded_password_in_Connection_String
// ============================================================
function hardcodedPasswordConnection() {
    const mysql = require("mysql");

    const connection = mysql.createConnection(
        "mysql://admin:AdminPassword123@localhost/users"
    );

    connection.connect();
}

// ============================================================
// 16. HttpOnly_Cookie_Flag_Not_Set
// ============================================================
function httpOnlyCookieFlagNotSet(req, res) {
    res.cookie("sessionId", req.session.id, {
        secure: true
        // HttpOnly is intentionally missing.
    });

    res.send("Logged in");
}

// ============================================================
// 17. Information_Exposure_Through_Directory_Listing
// ============================================================
function directoryListing(req, res) {
    const fs = require("fs");

    fs.readdir("/var/www/uploads", function (err, files) {
        res.json(files);
    });
}

// ============================================================
// 18. Information_Exposure_Through_Headers
// ============================================================
function informationExposureThroughHeaders(req, res) {
    res.setHeader("X-Internal-Server", "production-server-01");
    res.setHeader("X-Database-Host", "db.internal.company.local");
    res.setHeader("X-Debug-Path", "/opt/application/server");

    res.send("OK");
}

// ============================================================
// 19. Information_Exposure_Through_Log_Files
// ============================================================
function informationExposureThroughLogFiles(req) {
    const fs = require("fs");

    const username = req.body.username;
    const password = req.body.password;

    fs.appendFileSync(
        "/var/log/application.log",
        "username=" + username + " password=" + password + "\n"
    );
}

// ============================================================
// 20. Information_Exposure_Through_an_Error_Message
// ============================================================
function informationExposureThroughErrorMessage(req, res) {
    try {
        performSensitiveDatabaseOperation();
    } catch (error) {
        // Internal exception details are exposed to the client.
        res.status(500).send(error.stack);
    }
}

// ============================================================
// 21. Insecure_Direct_Object_References
// ============================================================
function insecureDirectObjectReferences(req, res) {
    const userId = req.query.id;

    db.users.findOne({ id: userId }, function (err, user) {
        res.json(user);
    });
}

// ============================================================
// 22. Insecure_Storage_of_Sensitive_Data
// ============================================================
function insecureStorageOfSensitiveData(req) {
    // Sensitive data stored directly in localStorage.
    localStorage.setItem("accessToken", req.body.accessToken);
    localStorage.setItem("creditCardNumber", req.body.creditCardNumber);
}

// ============================================================
// 23. JSON_Hijacking
// ============================================================
function jsonHijacking(req, res) {
    const users = getUsers();

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(users));
}


// ============================================================
// Expected query names for AI validation
// ============================================================
const EXPECTED_QUERY_NAMES = [
    "Absolute_Path_Traversal",
    "CSRF",
    "Cleartext_Storage_Of_Sensitive_Information",
    "Code_Injection",
    "Command_Injection",
    "Comparing_instead_of_Assigning",
    "Cookie_Poisoning",
    "Dangerous_File_Size_Upload",
    "Divide_By_Zero",
    "Dynamic_File_Inclusion",
    "Excessive_Data_Exposure",
    "Expression_is_Always_False",
    "Expression_is_Always_True",
    "HTTP_Response_Splitting",
    "Hardcoded_password_in_Connection_String",
    "HttpOnly_Cookie_Flag_Not_Set",
    "Information_Exposure_Through_Directory_Listing",
    "Information_Exposure_Through_Headers",
    "Information_Exposure_Through_Log_Files",
    "Information_Exposure_Through_an_Error_Message",
    "Insecure_Direct_Object_References",
    "Insecure_Storage_of_Sensitive_Data",
    "JSON_Hijacking"
];

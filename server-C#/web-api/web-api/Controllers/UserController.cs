using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    public class User
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
    }
    private const string JsonFilePath = "users.json";

    [HttpPost]
    public IActionResult Post([FromBody] User user)
    {
        try
        {
            // Read existing users from the JSON file
            List<User> existingUsers = ReadUsersFromJsonFile();

            // Add the new user
            existingUsers.Add(user);

            // Write the updated list back to the JSON file
            WriteUsersToJsonFile(existingUsers);

            return Ok("User added successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    private List<User> ReadUsersFromJsonFile()
    {
        if (System.IO.File.Exists(JsonFilePath))
        {
            string json = System.IO.File.ReadAllText(JsonFilePath);
            return JsonConvert.DeserializeObject<List<User>>(json);
        }
        return new List<User>();
    }

    private void WriteUsersToJsonFile(List<User> users)
    {
        string json = JsonConvert.SerializeObject(users, Formatting.Indented);
        System.IO.File.WriteAllText(JsonFilePath, json);
    }
}
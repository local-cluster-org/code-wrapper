using System.DirectoryServices;

public class UserSearch
{
    public DirectorySearcher Search(string username)
    {
        var searcher = new DirectorySearcher();

        searcher.Filter = "(uid=" + username + ")";

        return searcher;
    }
}

using CsvHelper.Configuration;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class ClimbCsvMap : ClassMap<ClimbCsvRecord>
    {
        public ClimbCsvMap()
        {
            Map(m => m.Id).Name("id");
            Map(m => m.Name).Name("name");
            Map(m => m.Location).Name("Location");
            Map(m => m.Url).Name("URL");
            Map(m => m.RouteType).Name("Route Type");
            Map(m => m.Grade).Name("grade");
            Map(m => m.Pitches).Name("Pitches");
            Map(m => m.AreaLatitude).Name("Area Latitude");
            Map(m => m.AreaLongitude).Name("Area Longitude");
        }
    }
} 
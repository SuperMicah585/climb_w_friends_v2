using CsvHelper.Configuration;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class ClimbCsvMap : ClassMap<ClimbCsvRecord>
    {
        public ClimbCsvMap()
        {
            Map(m => m.Id).Name("id");
            Map(m => m.Name).Name("name");
            Map(m => m.Location).Name("location");
            Map(m => m.Url).Name("url");
            Map(m => m.RouteType).Name("route_type");
            Map(m => m.Grade).Name("grade");
            Map(m => m.Pitches).Name("pitches");
            Map(m => m.AreaLatitude).Name("area_latitude");
            Map(m => m.AreaLongitude).Name("area_longitude");
        }
    }
} 
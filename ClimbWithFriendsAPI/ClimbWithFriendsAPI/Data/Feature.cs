using System.Collections.Generic;
using System.Linq; // For FirstOrDefault
using NetTopologySuite;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using Newtonsoft.Json; // For JSON serialization


namespace ClimbWithFriendsAPI.Data
{
    public class Feature
    {
  
        public int FeatureId { get; set; }

        public int TagId { get; set; }
        public int MapId { get; set; }
        public string Type { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }

        
    }


public class FeatureDependencies
{
    public List<Tag> Tags { get; set; } // Collection of tags
    public Climb Climb { get; set; }    // Single climb
    public List<UserObjectForFeature> UserObjectForFeature {get;set;}
    public Attempt Attempts {get;set;}
    public Tick Ticks {get;set;}
}

public class FeatureResult
{
    public Feature Feature { get; set; }
    public ClimbResult Climbs { get; set; }
}

public class ClimbResult
{
    public List<int> ClimbIds { get; set; }
    public List<double[]> Coordinates { get; set; }
}

public class UserObjectForFeature
{
    public int UserId {get;set;}
    public string Auth0ID { get; set; }
    public string Name { get; set; }
    public string Username {get;set;}
}


//I need to get all featureID: [{"coordinates":[string,string]},climbId: number},{},{}...]

public class ClimbData
{
    public double[] Coordinates { get; set; } // Coordinates as [longitude, latitude]
    public int ClimbId {get;set;}
}

public class FeatureObject
{
    public string Type { get; set; } = "Feature"; // Default to "Feature"
    public int Id { get; set; } // Assuming FeatureId is an integer
    public FeatureProperties Properties { get; set; } = new FeatureProperties();
    public FeatureGeometry Geometry { get; set; } = new FeatureGeometry();
}

public class FeatureProperties
{
    public List<string> Climbs { get; set; } = new List<string>(); // Assuming Climbs is a list of strings
}

public class FeatureGeometry
{
    public string Type { get; set; } = "Point"; // Default to "Point"
    public List<double> Coordinates { get; set; } = new List<double>(); // Assuming coordinates is a list of doubles
}

public class GeoJsonShell
{
    public string Type { get; set; } = "FeatureCollection";
    public List<object> Features { get; set; } = new List<object>();
}

public class Bucket
{
    public int FeatureId { get; set; }
    public List<ClimbData> Climbs { get; set; }
}
}
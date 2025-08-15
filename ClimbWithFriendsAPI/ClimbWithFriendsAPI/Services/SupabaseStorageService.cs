using Supabase;
using Supabase.Gotrue;
using Supabase.Storage;
using Microsoft.Extensions.Configuration;
using Client = Supabase.Client;

namespace ClimbWithFriendsAPI.Services
{
    public class SupabaseStorageService
    {
        private readonly Client _supabaseClient;
        private readonly string _bucketName = "climb_w_friends_2";

        public SupabaseStorageService(IConfiguration configuration)
        {
            var supabaseUrl = configuration["Supabase:Url"];
            var supabaseKey = configuration["Supabase:ServiceKey"];

            if (string.IsNullOrEmpty(supabaseUrl) || string.IsNullOrEmpty(supabaseKey))
            {
                throw new InvalidOperationException("Supabase configuration is missing");
            }

            var options = new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = true
            };

            _supabaseClient = new Client(supabaseUrl, supabaseKey, options);
        }

        public async Task<string> UploadImageAsync(Stream fileStream, string fileName)
        {
            try
            {
                // Generate a unique path for the image
                var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                var uniqueFileName = $"{timestamp}-{fileName}";
                var filePath = $"maps/{uniqueFileName}";

                // Convert stream to byte array
                using var memoryStream = new MemoryStream();
                await fileStream.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                // Upload the file to Supabase Storage
                var result = await _supabaseClient.Storage
                    .From(_bucketName)
                    .Upload(fileBytes, filePath);

                if (result == null)
                {
                    throw new Exception("Failed to upload image to Supabase");
                }

                // Get the public URL
                var publicUrl = _supabaseClient.Storage
                    .From(_bucketName)
                    .GetPublicUrl(filePath);

                return publicUrl;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading image: {ex.Message}", ex);
            }
        }

        public async Task DeleteImageAsync(string imageUrl)
        {
            try
            {
                // Extract the file path from the URL
                var uri = new Uri(imageUrl);
                var pathSegments = uri.AbsolutePath.Split('/');
                var fileName = pathSegments.LastOrDefault();

                if (string.IsNullOrEmpty(fileName))
                {
                    throw new Exception("Invalid image URL");
                }

                // Delete the file from Supabase Storage
                await _supabaseClient.Storage
                    .From(_bucketName)
                    .Remove(new List<string> { $"maps/{fileName}" });
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting image: {ex.Message}", ex);
            }
        }

        public string GetImageUrl(string filePath)
        {
            return _supabaseClient.Storage
                .From(_bucketName)
                .GetPublicUrl(filePath);
        }
    }
} 
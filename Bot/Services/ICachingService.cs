namespace Bot.Services
{
    public interface ICachingService
    {
        T? Get<T>(string cacheKey);
        void Set<T>(string cacheKey, T value, TimeSpan time);
        void Remove(string cacheKey);
    }
}

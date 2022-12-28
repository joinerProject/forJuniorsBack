if(!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public connectionString = "";
}

class DevelopmentConfig extends Config {
    public port = 3001;
    public connectionString = "mongodb+srv://juniors-project:juniors-project@juniors-project.ywb1wsz.mongodb.net/Juniors-project"; // <-- Change to correct database name
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public connectionString = "mongodb+srv://juniors-project:juniors-project@juniors-project.ywb1wsz.mongodb.net/Juniors-project"; // <-- Change to correct database name
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;

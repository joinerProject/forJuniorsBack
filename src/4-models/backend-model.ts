import mongoose from 'mongoose';

export interface IBackendModel extends mongoose.Document {
  projectId: mongoose.schema.Types.ObjectId;
  language:string;
  algorithm:string;
  technology:string;
  operatingSystem:string;
  db:string
}

/**
 *     public language:string;
    public algorithm?:string;
    /**
     * select from main 6 types:
     * Recursive Algorithm
     * Divide and Conquer Algorithm.
     * Dynamic Programming Algorithm.
     * Greedy Algorithm.
     * Brute Force Algorithm.
     * Backtracking Algorithm.
     * add an option to select "other"
     */
    // public technology?: string;
    // public operatingSystem:string;
    // public db?:string;


export const BackendSchema = new mongoose.Schema<IBackendModel>(
  {
    projectId: {
      type: String,
      unique: true,
      required: [true, "Missing projectId"],
      minLength: [2, "projectId too short"],
      maxLength: [20, "projectId too long"],
    },
    algorithm: {
      type: String,
      required: false,
    },
    technology: {
      type: String,
      required: [false, "Missing technology"],
    },
    operatingSystem: {
      type: String,
      required: [true, "missing operating system"],
    },
    db:{
        type:String,
        required:[true, "missing db"]
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    toObject: {
      transform: (_doc, backend) => {
        return backend;
      },
    },
  }
);

export const BackendModel = mongoose.model<IBackendModel>(
  "BackendModel",
  BackendSchema,
  "backend"
);

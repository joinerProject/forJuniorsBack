import mongoose from 'mongoose';

export interface IFrontendModel extends mongoose.Document {
  projectId: mongoose.schema.Types.ObjectId;
  language:string;
  technology:string;
  framework:string;
}

/**
 *  public language:string;
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


export const FrontendSchema = new mongoose.Schema<IFrontendModel>(
  {
    projectId: {
      type: String,
      unique: true,
      required: [true, "Missing projectId"],
      minLength: [2, "projectId too short"],
      maxLength: [20, "projectId too long"],
    },
    framework: {
      type: String,
      required: [true, "missing framework"],
    },
    technology: {
      type: String,
      required: [false, "Missing technology"],
    },
    language:{
        type:String,
        required:[true, "Missing language"]
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

export const FrontendModel = mongoose.model<IFrontendModel>(
  "FrontendModel",
  FrontendSchema,
  "frontend"
);

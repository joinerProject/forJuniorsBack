import mongoose from 'mongoose';

// class User {
//   public name: string;
//   public creatorId: string;
//   public isMatched: string;
//   public partnerId: string;
//   public linkedinProfile: string;
//   public constructor(
//     name: string,
//     userName: string,
//     isMatched: string,
//     partnerId: string,
//     linkedinProfile: string
//   ) {
//     this.name = name;
//     this.userName = userName;
//     this.isMatched = isMatched;
//     this.partnerId = partnerId;
//     this.linkedinProfile = linkedinProfile;
//   }
// }

export interface IProjectModel extends mongoose.Document {
  creatorId: mongoose.schema.Types.ObjectId;
  createdAt: string;
  isMatched: boolean;
  partnerId: mongoose.schema.Types.ObjectId;
  projectType:string;
}

export const ProjectSchema = new mongoose.Schema<IProjectModel>(
  {
    creatorId: {
      type: String,
      unique: true,
      required: [true, "Missing creatorId"],
      minLength: [2, "creatorId too short"],
      maxLength: [20, "creatorId too long"],
    },
    createdAt: {
      type: String,
      required: false,
    },
    isMatched: {
      type: Boolean,
      required: [true, "Missing isMatched"],
    },
    partnerId: {
      type: String,
      required: false,
      unique: true,
    },
    projectType:{
        type:String,
        reuired:[true ,"Missing project type"]
    },

  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    toObject: {
      transform: (_doc, project) => {
        return project;
      },
    },
  }
);

export const ProjectModel = mongoose.model<IProjectModel>(
  "ProjectModel",
  ProjectSchema,
  "projects"
);

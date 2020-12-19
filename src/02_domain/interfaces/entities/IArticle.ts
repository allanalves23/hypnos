import { Document, Types } from 'mongoose';
import ICategory from './ICategory';
import ITheme from './ITheme';

interface IArticle extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  state: string;
  themeId: Types.ObjectId;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
  logoImg: string;
  secondaryImg: string;
  headerImg: string;
  contentType: string;
  content: string;
  socialVideoType: string;
  socialVideo: string;
  socialRepositoryType: string;
  socialRepository: string;
  customUri: string;
  removedAt: Date;
  inactivatedAt: Date;
  publishedAt: Date;
  boostedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  theme: ITheme;
  category: ICategory;
}

export default IArticle;

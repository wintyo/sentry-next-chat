import mongoose from 'mongoose';

export interface ITimestamps {
  createdAt: Date;
  updateAt: Date;
}

export type tDocument<Fields> = Fields & ITimestamps & mongoose.Document;
export type tSchema<Fields> = {
  [K in keyof Fields]: mongoose.SchemaDefinitionProperty<Fields[K]>;
};

import IComment from '../../02_domain/interfaces/entities/IComment';

class CommentModel {
  public id: string;
  public readerName: string;
  public readerEmail: string;
  public content: string;
  public articleId: string;
  public state: string;
  public readedAt: Date;
  public createdAt: Date;

  constructor(comment: IComment) {
    this.id = comment?.id;
    this.readerName = comment?.userName;
    this.readerEmail = comment?.userEmail;
    this.content = comment?.message;
    this.articleId = comment?.articleId.toHexString();
    this.state = comment?.state;
    this.readedAt = comment?.readedAt;
    this.createdAt = comment?.createdAt;
  }
}

export default CommentModel;

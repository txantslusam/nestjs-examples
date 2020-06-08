import { InputType, Field } from "@nestjs/graphql";

@InputType()
class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

export default CreateUserInput;

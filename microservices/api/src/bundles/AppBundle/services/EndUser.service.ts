import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { PermissionService } from "@bluelibs/security-bundle";
import {
  XPasswordService,
  RegistrationInput,
} from "@bluelibs/x-password-bundle";
import { UserRole } from "../collections";

@Service()
export class EndUserService {
  @Inject()
  private xPasswordService: XPasswordService;

  @Inject()
  private permissionService: PermissionService;

  public async register(input: RegistrationInput) {
    const { userId, token } = await this.xPasswordService.register(input);

    await this.permissionService.add({
      userId,
      domain: "app",
      permission: UserRole.END_USER,
    });

    return {
      userId: userId as ObjectId,
      token,
    };
  }
}

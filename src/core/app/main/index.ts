import { registerMainHandlers } from "@core/app/register-main-handlers"
import { listFolder } from "@core/app/main/handlers/list-folder"

export default registerMainHandlers({
  "@app/list-folder": listFolder,
})

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoleService } from "./role.service";

const getUsers = catchAsync(async (req, res) => {
    const result = await RoleService.getUsersFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});


export const RoleController = {
    getUsers
}
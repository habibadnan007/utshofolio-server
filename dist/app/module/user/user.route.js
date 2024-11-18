"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const admin_validation_1 = require("../admin/admin.validation");
const traveler_validation_1 = require("../traveler/traveler.validation");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/create-traveler', uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(traveler_validation_1.createTravelerZodSchema), user_controller_1.userController.insertTraveler);
router.post('/create-admin', 
// auth(USER_ROLE.ADMIN),
uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(admin_validation_1.createAdminZodSchema), user_controller_1.userController.insertAdmin);
// router.post(
//   '/create-admin',
//   zodValidateHandler(createAdminZodSchema),
//   userController.insertAdmin,
// )
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.TRAVELER), user_controller_1.userController.getMe);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.userController.getAllUsers);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), user_controller_1.userController.getUserById);

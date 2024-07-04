const User = require("../../models/User");
const AppError = require("../../utils/appError"); // Assuming you have a custom error class

// Function 1: Change ThemeMode
exports.ChangeThemeMode = async (req, res, next) => {
  const userId = req.params.id; // URL에서 _id 가져오기
  const { themeMode } = req.body; // 요청 본문에서 themeMode 가져오기

  try {
    // 사용자 찾기 및 themeMode 업데이트
    const user = await User.findByIdAndUpdate(userId, { themeMode: themeMode }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Theme mode updated successfully", user });
  } catch (error) {
    next(error);
  }
};

// Function 2: followUser
exports.followUser = async (req, res, next) => {
  try {
    const userToFollowId = req.params.id;
    const currentUser = await User.findById(req.user.id); // Logged-in user

    if (userToFollowId === currentUser._id.toString()) {
      return next(new AppError("Cannot follow yourself", 400));
    }

    if (currentUser.connections.includes(userToFollowId)) {
      return next(new AppError("Already following user", 400)); // Or implement an 'unfollow' action
    }

    currentUser.connections.push(userToFollowId);
    await currentUser.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    next(error);
  }
};


checkPasswordValidation = function(password) {
    var ActiveEntryConfiguration = Session.get('Photonic.ActiveEntry');
    var requireStrongPasswords = ActiveEntryConfiguration && ActiveEntryConfiguration.passwordOptions && ActiveEntryConfiguration.passwordOptions.requireStrongPasswords || false;
    if (requireStrongPasswords) {
        var validationType = ActiveEntryConfiguration && ActiveEntryConfiguration.passwordOptions && ActiveEntryConfiguration.passwordOptions.validationType || false;

        if (validationType === "regex") {
            // Apply regex validation rule
            var result = password.search(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+])[0-9a-zA-Z!@#$%^&*+]{8,}$/i);
            if (result > -1) {
                return true;
            }
        } else if (validationType === "zxcvbn" && typeof(zxcvbn) === typeof(Function)) {
            // Check zxcvbn
            var zxcvbnResult = zxcvbn(password);
            if (zxcvbnResult && zxcvbnResult.score > 2) {
                return true;
            }
        }
        return false;
    } else {
        if (password.length >= 8) {
            return true;
        }
    }

    return false;
};
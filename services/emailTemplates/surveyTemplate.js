const keys = require('../../config/keys');

module.exports = survey => {
  return `<html>
<body>
    <div style="text-align: center;">
        <h3>
            Please provide your valuable input.
        </h3>
        <p>${survey.body}</p>
        <div>
            <a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/Yes">Yes</a></div>
        <div>
            <a href="${keys.REDIRECT_DOMAIN}/api/surveys/${survey.id}/No">No</a></div>

    </div>
</body>
</html> `;
};

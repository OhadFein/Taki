const userList = {};

function userAuthentication(req, res, next) {
	if (userList[req.session.id] === undefined) {
		res.sendStatus(401);
	} else {
		next();
	}
}

function addUserToAuthList(req, res, next) {	
	if (userList[req.session.id] !== undefined) {
		res.status(403).send('user already exist');
	}
	else {
		for (sessionid in userList) {
			const user = userList[sessionid];
			if (user.name === req.body) {
                res.status(403).send('user name already exist');
				return;
			}
		}
		userList[req.session.id] = {name: req.body, isInGame: false, tableName: '', type: "human"};
		next();
	}
}

function removeUserFromAuthList(req, res, next) {	
	if (userList[req.session.id] === undefined) {
		res.status(403).send('user does not exist');
	} else {						
		delete userList[req.session.id];
		next();
	}
}

function getUserInfo(id) {	
    return userList[id];
}

module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo, userList}
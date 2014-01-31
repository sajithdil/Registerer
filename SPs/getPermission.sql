DROP PROCEDURE IF EXISTS getPermission;
DELIMITER $$
CREATE PROCEDURE getPermission(IN empno INT(11), IN Roleid INT(2))
BEGIN

	CREATE TEMPORARY TABLE `report`(`PermissionID` int(2),`PermissionName` varchar(50),`MainPermission` int(2), `extra` varchar(5) );
	
        INSERT INTO `report`	
        SELECT p.PermissionID, p.PermissionName, p.MainPermission, p.extra
	FROM Permissions p 
	INNER JOIN login_permissions o ON o.PermissionID = p.PermissionID
	WHERE o.emp_no = empno;
        
        INSERT INTO `report`
	SELECT p.PermissionID, p.PermissionName, p.MainPermission, p.extra
	FROM Permissions p 
	INNER JOIN role_permissions r ON p.PermissionID = r.PermissionID
	WHERE r.RoleID=roleid;
        
        SELECT * FROM `report`;
        
END
$$
DELIMITER ;
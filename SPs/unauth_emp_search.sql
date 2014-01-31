DROP PROCEDURE IF EXISTS unauth_emp_search;
DELIMITER $$
CREATE PROCEDURE unauth_emp_search(IN lstn varchar(16), IN dept VARCHAR(40), IN ttl VARCHAR(50), IN lim INT(6), IN off INT(6))
BEGIN
	SET @var = 'SELECT e.emp_no, e.first_name, e.last_name, e.gender, p.dept_name, t.title ';
	SET @tablejoin = 'FROM employees e INNER JOIN dept_emp d ON e.emp_no=d.emp_no INNER JOIN departments p ON d.dept_no=p.dept_no INNER JOIN titles t on e.emp_no = t.emp_no ';
	SET @wherelastname = CONCAT('e.last_name LIKE \'%',lstn,'%\' ');
	SET @wheredept = CONCAT('p.dept_name LIKE \'%',dept,'%\' ');
	SET @wheretitle = CONCAT('t.title LIKE \'%',ttl,'%\' ');
	SET @ands = 'AND ';
	SET @wheres = "WHERE ";
	SET @limiter=CONCAT('LIMIT ',lim,' OFFSET ', off,';');
	SET @query = CONCAT(@var,@tablejoin);
	IF(lstn != 'undefined') THEN
		SET @query = CONCAT(@query,@wheres,@wherelastname);
                IF(dept != 'undefined' OR ttl != 'undefined') THEN
                	SET @query = CONCAT(@query,@ands);
                END IF;
	END IF;
        IF(dept != 'undefined') THEN
        	IF(lstn = 'undefined') THEN
                	SET @query = CONCAT(@query,@wheres);
                END IF;
                
        	SET @query = CONCAT(@query,@wheredept);
                IF(ttl != 'undefined')THEN
                	SET @query = CONCAT(@query,@ands);
                END IF;
        END IF;
        IF(ttl != 'undefined') THEN
        	IF(lstn = 'undefined' AND dept = 'undefined') THEN
                	SET @query = CONCAT(@query,@wheres);
                END IF;
                
        	SET @query = CONCAT(@query,@wheretitle);
        END IF;
        
        SET @query = CONCAT(@query,@limiter);
	PREPARE stmt FROM @query;
	EXECUTE stmt;

END
$$
DELIMITER ;
	
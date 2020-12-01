# coding=utf-8
USER_ACTIVATED = 0
USER_DEACTIVATED = 1
USER_INACTIVATED = 2
STATUS_TITLES = ['Đang làm việc', 'Nghỉ việc', 'Nghỉ tạm thời']

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xlsx', 'xlsm', 'xls',
                      'pptx', 'ppt', 'docx', 'doc', 'zip', 'rar'}

ALLOWED_EXTENSIONS_EXCEL = {'xlsx', 'xlsm', 'xls'}
ALLOWED_EXTENSIONS_IMG = {'png', 'jpg', 'jpeg', 'gif'}
PATH_SALARY = 'app/template/bangluong/'

URL_CLIENT = "http://localhost:5011"
URL_SERVER = "http://localhost:5010"

PATH_SALARY_SEVER = URL_SERVER + '/bangluong/'
PATH_AVATAR = 'app/template/avatars/'
PATH_AVATAR_SEVER = URL_SERVER + '/avatars/'
AVATAR_DEFAULT = 'avatar_default.png'
PATH_PROFILE = 'app/template/profile/'
PATH_ARTICLES = 'app/template/profile/'
PATH_PROFILE_SEVER = URL_SERVER + '/profile/'
PATH_NEWS_IMG = 'app/template/news/img/'
URL_NEWS_IMG = URL_SERVER + '/news/img/'
PATH_NEWS_FILE = 'app/template/news/files/'
URL_NEWS_FILE = URL_SERVER + '/news/files/'
PATH_NEWS_KEY = 'app/template/ssh_key/'
URL_NEWS_KEY = URL_SERVER + '/ssh_key/'

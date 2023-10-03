from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import *
from django.contrib.auth.hashers import check_password, make_password
# Create your views here.


def userLogin(request):
    if request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        print(username, password)
        try:
            user = UserAccount.objects.get(username=username)
            if user.first_login:
                request.session['username'] = user.username
                return HttpResponseRedirect('/change/password/first/login/')
            else:
                password_checher = check_password(password, user.password)
                # print(password_checher)
                if password_checher:
                    print(password_checher)
                    userToken = Token.objects.get(user=user).token
                    request.session['user_token'] = userToken
                    if user.position.id == 1:
                        return HttpResponseRedirect('/system/AM/')
                    elif user.position.id == 2:
                        return HttpResponseRedirect('/system/SE/')
                    elif user.position.id == 4:
                        return HttpResponseRedirect('/system/CC/Allowances/')
                else:
                    return HttpResponseRedirect('/?error=True')
        except Exception as ex:
            print(ex)
    # users = [
    #     ['ahmed', 'kamel', '', 'As123123', '00000000000000', 1],
    #     ['ahmed', 'saad', '', 'As123123', '00000000000000', 1],
    #     ['ahmed', 'sabry', '', 'As123123', '00000000000000', 1],
    #     ['mohamed', 'ibrahim', '', 'As123123', '00000000000000', 1],
    #     ['mohamed', 'fouad', '', 'As123123', '00000000000000', 1],
    #     ['saif', 'elsharabasi', '', 'As123123', '00000000000000', 1],
    #     ['Mohamed', 'Araby', '', 'As123123', '00000000000315', 2],
    #     ['Mohamed', 'Asker', '', 'As123123', '00000000005198', 2],
    #     ['Mahmoud', 'Salah', '', 'As123123', '00000000002395', 2],
    #     ['Ahmed', 'Said', '', 'As123123', '00000000001697', 2],
    #     ['Ahmed', 'ElNagar', '', 'As123123', '29110151100111', 2],
    #     ['Seif', 'Allah', '', 'As123123', '29506021200158', 2],
    #     ['Assem', 'Mahmoud', '', 'As123123', '29307058800454', 2],
    #     ['Lotfy', 'ElShayeb', '', 'As123123', '29306261201071', 2],
    #     ['Mohamed', 'Abuelkhier', '', 'As123123', '28904081401111', 2],
    #     ['Islam', 'Ahmed', '', 'As123123', '29108080400211', 2],
    #     ['Ahmed', 'Wahed', '', 'As123123', '29310101400318', 2],
    #     ['karam', 'abubakr', '', 'As123123', '28810052701411', 2],
    #     ['ahmed', 'semadaa', '', 'As123123', '29502042101651', 2],
    #     ['Wesam', 'Mamdouh', '', 'As123123', '29205131801131', 2],
    #     ['Ibrahim', 'Elgazzar', '', 'As123123', '29203141402894', 2],
    #     ['Mohamed', 'Marey', '', 'As123123', '29106210400038', 2],
    #     ['abdelrahman', 'amer', '', 'As123123', '29202130100431', 2],
    #     ['Mohamed', 'Ramadan', '', 'As123123', '00000000001593', 2],
    #     ['Ahmed', 'Khairy', '', 'As123123', '29409182300891', 2],
    #     ['ehab', 'salah', '', 'As123123', '29409010214836', 2],
    #     ['Akram', 'Hassan', '', 'As123123', '28703110201598', 3],
    #     ['Mohamed', 'Khamis', '', 'As123123', '27711262104236', 3],
    #     ['Ismail', 'AboElmaaty', '', 'As123123', '28602181100112', 3],
    #     ['Mohamed', 'Farouk', '', 'As123123', '28504290101658', 3],
    #     ['Abdelsalam', 'Fathi', '', 'As123123', '28906152100374', 3],
    #     ['Mostafa', 'Elsobky', '', 'As123123', '29306130103236', 3],
    #     ['Abdallah', 'Nabil', '', 'As123123', '29108161300297', 3],
    #     ['Mohamed', 'Abdelrahman', '', 'As123123', '28411060400097', 3],
    #     ['Mahmoud', 'Seliman', '', 'As123123', '28412070400113', 3],
    #     ['Ahmed', 'Hisham', '', 'As123123', '29606101302118', 3],
    #     ['Adel', 'Basyony', '', 'As123123', '29612071701896', 3],
    #     ['Abdelaziz', 'Abdelhamid', '', 'As123123', '29311011402091', 3],
    #     ['Saeed', 'Zakria', '', 'As123123', '27412311401554', 3],
    #     ['Emad', 'Kamouna', '', 'As123123', '28603212100431', 3],
    #     ['Sobhy', 'Kamal', '', 'As123123', '28202160102711', 3],
    #     ['ahmed', 'saeed', '', 'As123123', '29508142100331', 3],
    #     ['ahmed', 'elSebaay', '', 'As123123', '29509210100198', 3],
    #     ['mahmoud', 'khaled', '', 'As123123', '29207202800711', 3],
    #     ['Khalil', 'mohamed', '', 'As123123', '28807240200895', 3],
    #     ['kamal', 'mahmoud', '', 'As123123', '00000000000692', 3],
    #     ['hosny', 'yehia', '', 'As123123', '30008131401057', 3],
    # ]
    # for user in users:
    #     UserAccount.objects.create(
    #         first_name=user[0],
    #         last_name=user[1],
    #         email=user[2],
    #         password=make_password(user[3]),
    #         national_id=user[4],
    #         position_id=user[5],
    #     )
    return render(request, 'login.html', {})



def UserLogout(request):
    if 'user_token' in request.session:
        del request.session['user_token']
    if 'username' in request.session:
        del request.session['username']
    return HttpResponseRedirect('/')


def UserChangePasswordFirstLogin(request):
    if 'username' in request.session:
        if request.method == 'POST':
            username = request.POST.get('reg_username', None)
            password = request.POST.get('new_password', None)
            try:
                user = UserAccount.objects.get(username=username)
                user.password = make_password(password)
                user.first_login = False
                user.save()
                del request.session['username']
                return HttpResponseRedirect('/')
            except Exception as ex:
                print(ex)
        return render(request, 'changePasswordFirstLogin.html', {'username': request.session['username']})
    else:
        return HttpResponseRedirect('/logout/')

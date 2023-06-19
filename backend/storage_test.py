"""Tests for the mock storage layer."""

import storage
import pytest
from user import User

@pytest.fixture(autouse=True)
def pretest_clear_data():
    """Before running each test, reset the storage module's data."""
    storage.reset()


def test_get_registrations_empty():
    assert(len(storage.get_registrations()) == 0)


def test_create_registration_valid():
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage.create_registration(user)
    users = storage.get_registrations()
    assert(len(users) == 1)
    assert(users[0].pid == pid)


def test_create_registration_invalid_pid():
    pid = 71045308
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    with pytest.raises(Exception):
        storage.create_registration(user)


def test_create_registration_missing_first_name():
    pid = 71045308
    user = User(pid=pid, first_name="", last_name="Jordan")
    with pytest.raises(Exception):
        storage.create_registration(user)


def test_create_registration_missing_last_name():
    pid = 71045308
    user = User(pid=pid, first_name="Kris", last_name="")
    with pytest.raises(Exception):
        storage.create_registration(user)
    

def test_create_registration_duplicate():
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage.create_registration(user)
    with pytest.raises(Exception):
        storage.create_registration(user)


def test_get_user_by_pid_does_not_exist():
    assert storage.get_user_by_pid(710453084) is None


def test_get_user_by_pid_does_exist():
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage.create_registration(user)
    assert storage.get_user_by_pid(710453084) is user


def test_create_checkin_unknown_pid():
    with pytest.raises(Exception):
        storage.create_checkin(710453084)


def test_create_checkin_produces_checkin():
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage.create_registration(user)
    storage.create_checkin(pid)
    checkins = storage.get_checkins()
    assert(len(checkins) == 1)
    assert(checkins[0].user == user)

def test_delete_works():
    storage.reset()
    pid = 710453084
    pid2 = 123456789
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    user2 = User(pid=pid2, first_name="John", last_name="Jordan")
    storage.create_registration(user)

    storage.create_registration(user2)
    storage.create_checkin(pid)
    storage.create_checkin(pid2)
    storage.create_checkin(pid2)

    storage.delete_user(710453084)
    storage.delete_user(pid2)
    checkins = storage.get_checkins()
    registrations = storage.get_registrations()
    assert(len(checkins) == 0)
    assert(len(registrations) == 0)
//CIB for Continuous Integration Board
var CIB_APP;
CIB_APP = function CIB_APP() {
    this.STATES = {
        PENDING: '1.1',
        RUNNING: '1.2',
        REJECTED: '1.3',
        ACCEPTED: '1.4',
        COMPLETE: '1.5',
        DEPLOYED: '1.6'
    };

    this.TRENDS = {
        UP: 'trend_up',
        DOWN: 'trend_down',
        STAG: 'trend_stag'
    };
    this.ICON_CHARACTERS = {
        server: '&#xf233;',
        trend_up: '&#xf077;',
        trend_down: '&#xf078;',
        trend_stag: '&#xf054;',
        cubes: '&#xf1b3;',
        shield: '&#xf132;',
        eye: '&#xf06e;',
        share: '&#xf064;',
        upload: '&#xf0ee;',
        caret_up: '&#xf0d8;',
        caret_down: '&#xf0d7;'
    };
    this.TASK_TYPES = {
        FIREWALL: '2.1',
        BUILD: '2.2'
    };
    this.SESSION = {
        SORT: 'mongo_sort_obj',
        OPEN_TASK: 'open_task_id'
    };
    this.DEPLOYMENTS = [
        {name: 'Production', value: 'prod'},
        {name: 'Staging', value: 'rc'},
        {name: 'Quality', value: 'qa'}
    ];
    this.getDeploymentName = function getDeploymentName(value) {
        for (i = 0; i < this.DEPLOYMENTS.length; i++) {
            var elem = this.DEPLOYMENTS[i];
            if (elem.value === value) {
                return elem.name;
            }
        }
    };
    this.getDateTimeFormat = function getDateTimeFormat() {
        return 'M/D/YYYY h:mma';
    };
    this.getDateFormat = function getDateFormat() {
        return 'M/D/YYYY';
    };
    this.getTimeFormat = function getTimeFormat() {
        return 'h:mma';
    };

    this.getCompletionClass = function getCompletionClass(completion, error) {
        if (error) {
            return 'danger';
        } else if (parseInt(completion, 10) >= 100) {
            return 'success';
        } else if (parseInt(completion, 10) <= 0) {
            return 'muted';
        } else {
            return 'info';
        }
    }
};

CIB = new CIB_APP();

CIB.startupScript = function () {
    tasks.remove({});
    tasks.insert({
        label: "Tenrow-R1_1235",
        owner: null,
        start: null,
        end: null,
        status: CIB.STATES.PENDING,
        type: CIB.TASK_TYPES.BUILD,
        metrics: {
            completion: 0,
            error: false,
            test: {
                value: null,
                trend: null
            },
            maintainability: {
                value: null,
                trend: null
            },
            security: {
                value: null,
                trend: null
            },
            workmanship: {
                value: null,
                trend: null
            }
        },
        build: {
            completion: 0,
            error: false,
            branches: [
                {name: 'Debug', end: null, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432470",
        owner: 'Dan',
        start: new Date().getTime(),
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 60,
            error: false,
            test: {
                value: null,
                trend: null
            },
            maintainability: {
                value: null,
                trend: null
            },
            security: {
                value: null,
                trend: null
            },
            workmanship: {
                value: null,
                trend: null
            }
        },
        build: {
            completion: 0,
            error: false,
            branches: [
                {name: 'Debug', end: null, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432464",
        owner: 'Mathieu',
        start: new Date().getTime() - 300000,
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 30,
            error: false,
            branches: [
                {name: 'Debug', end: null, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432461",
        owner: 'Lionel',
        start: new Date().getTime() - 3000000,
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 30,
            error: false,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 60000, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432465",
        owner: 'Sarah',
        start: new Date().getTime() - 60000,
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: false,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 50000, error: false},
                {name: 'Release', end: new Date().getTime() - 56000, error: false}
            ]
        },
        unit: {
            completion: 57,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432466",
        owner: 'Valentine',
        start: new Date().getTime() - 609000,
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: true,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 509000, error: true},
                {name: 'Release', end: new Date().getTime() - 509600, error: false}
            ]
        },
        unit: {
            completion: 100,
            error: false,
            tests: {pass: 135, fail: 12},
            coverage: 84
        },
        functional: {
            completion: 10,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    tasks.insert({
        label: "432467",
        owner: 'Valentine',
        start: new Date().getTime() - 619000,
        end: null,
        status: CIB.STATES.RUNNING,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: false,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 529000, error: false},
                {name: 'Release', end: new Date().getTime() - 529600, error: false}
            ]
        },
        unit: {
            completion: 100,
            error: false,
            tests: {pass: 135, fail: 12},
            coverage: 84
        },
        functional: {
            completion: 100,
            error: false,
            tests: {pass: 7000, fail: 456},
            coverage: 80
        }
    });
    tasks.insert({
        label: "432463",
        owner: 'Johnathan',
        start: new Date().getTime() - 900000,
        end: new Date().getTime() - 200,
        status: CIB.STATES.REJECTED,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: true,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.DOWN
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: false,
            branches: [
                {name: 'Debug', end: null, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 100,
            error: false,
            tests: {pass: 142, fail: 10},
            coverage: 76
        },
        functional: {
            completion: 100,
            error: false,
            tests: {pass: 4321, fail: 2145},
            coverage: 23
        }
    });
    tasks.insert({
        label: "432462",
        owner: 'Johnathan',
        start: new Date().getTime() - 1000000,
        end: new Date().getTime() - 200,
        status: CIB.STATES.REJECTED,
        type: CIB.TASK_TYPES.FIREWALL,
        metrics: {
            completion: 100,
            error: true,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.DOWN
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 0,
            error: false,
            branches: [
                {name: 'Debug', end: null, error: false},
                {name: 'Release', end: null, error: false}
            ]
        },
        unit: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        },
        functional: {
            completion: 0,
            error: false,
            tests: {pass: null, fail: null},
            coverage: null
        }
    });
    var build = tasks.insert({
        label: "Tenrow-R1_1234",
        owner: '',
        start: new Date().getTime() - 18000000,
        end: new Date().getTime() - 1000,
        status: CIB.STATES.COMPLETE,
        type: CIB.TASK_TYPES.BUILD,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: false,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 1000, error: false},
                {name: 'Release', end: new Date().getTime() - 1000, error: false}
            ]
        },
        unit: {
            completion: 100,
            error: false,
            tests: {pass: 142, fail: 10},
            coverage: 76
        },
        functional: {
            completion: 100,
            error: false,
            tests: {pass: 4321, fail: 2145},
            coverage: 23
        }
    });
    tasks.insert({
        label: "432456",
        owner: 'Johnathan',
        start: new Date().getTime() - 20000000,
        end: new Date().getTime() - 1000000,
        status: CIB.STATES.ACCEPTED,
        type: CIB.TASK_TYPES.FIREWALL,
        build_task: build,
        metrics: {
            completion: 100,
            error: false,
            test: {
                value: 64,
                trend: CIB.TRENDS.UP
            },
            maintainability: {
                value: 53,
                trend: CIB.TRENDS.UP
            },
            security: {
                value: 64,
                trend: CIB.TRENDS.STAG
            },
            workmanship: {
                value: 72,
                trend: CIB.TRENDS.STAG
            }
        },
        build: {
            completion: 100,
            error: false,
            branches: [
                {name: 'Debug', end: new Date().getTime() - 1000, error: false},
                {name: 'Release', end: new Date().getTime() - 1000, error: false}
            ]
        },
        unit: {
            completion: 100,
            error: false,
            tests: {pass: 142, fail: 10},
            coverage: 76
        },
        functional: {
            completion: 100,
            error: false,
            tests: {pass: 4321, fail: 2145},
            coverage: 23
        }
    });
};
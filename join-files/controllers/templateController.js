angular.module('includeExample', [])

.factory('login', ['$http', function($http) {

    var profileStatus = {};

    return {
        login: function(values, callback) {

            // $http.post('/sign-in', values).success(callback);	



            var values = {
                name: {
                    value: "Rafael Calpena Rodrigues",
                    isEditing: false
                },
                about: {
                    value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue aliquet velit, vel volutpat libero dignissim in. Morbi eu volutpat metus. Suspendisse arcu lectus, ullamcorper eget elit nec, semper feugiat nisl. Suspendisse tempor metus a scelerisque ullamcorper. Vestibulum feugiat nibh in mauris mollis viverra ultrices convallis nibh. Vestibulum at blandit eros, eget efficitur eros. Cras ultrices justo eros, non vulputate enim blandit vel. Aliquam aliquet arcu porta, iaculis massa ac, commodo magna. Proin ullamcorper feugiat risus, ac tincidunt nulla iaculis in. Fusce sed feugiat quam. Mauris imperdiet ornare diam, non gravida nisl. Proin sollicitudin elit et consectetur pellentesque. Praesent ligula ligula, pretium quis sodales eget, pulvinar sit amet augue. Praesent lobortis, enim non feugiat lobortis, lectus lectus molestie sapien, in cursus ex mauris a tortor. Nullam blandit, odio ac iaculis dictum, dolor sem aliquet tortor, eget aliquam tortor urna non lorem. Cras tempor eleifend nunc non eleifend. Suspendisse auctor diam a metus varius, eu consequat odio aliquam. Nulla suscipit dictum dictum. Donec tortor ligula, accumsan vitae ex quis, finibus lobortis erat. Curabitur sapien orci, ornare quis varius eu, bibendum at risus. Etiam ac eros eros. Mauris semper luctus eros. Maecenas varius ligula eget arcu ultrices, id ullamcorper sem dignissim. Nulla sed quam varius, vestibulum odio ac, condimentum lorem. Curabitur sem eros, elementum id placerat suscipit, varius vitae ipsum.Phasellus id lorem est. Morbi quis est finibus, aliquam nulla eu, facilisis lorem. Duis sit amet enim dui. Donec condimentum lectus nec nisl commodo tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor tempus eros quis fringilla. Duis eu nisl mattis, lacinia ipsum eu, consequat tellus. Aliquam et purus quis erat faucibus pulvinar nec ut odio. Suspendisse dignissim orci sed placerat vulputate. Vivamus in mauris bibendum odio aliquam placerat eget tincidunt nulla.",
                    isEditing: false
                },
                pictures: [{
                    url: "http://placekitten.com/500/300"
                }],
                contact: [{
                    title: "Email",
                    value: "abc.def@ghi.com",
                    isEditing: false
                }, {
                    title: "Telephone",
                    value: "555-555-5555",
                    isEditing: false
                }]
            }

            /*$http.post('/sign-in', values).success(function(response){
            	value = response
            })*/

            profileStatus = values;

            window.setTimeout(function() {
                callback(values);

            }, 3000)


        },

        getProfileStatus: function() {
            return profileStatus;
        }
    }
}])

.controller('ExampleController', ['$scope', 'login', function($scope, login) {
    $scope.templates = [{
        name: 'template1.html',
        url: 'views/loginTemplate.html'
    }, {
        name: 'template2.html',
        url: 'views/new-profile.html'
    }];
    $scope.template = $scope.templates[0];

    $scope.inputValues = {
        username: "",
        password: ""
    }

    $scope.signIn = function() {

        //remove modal
        $('#signin').modal('hide');

        var values = $scope.inputValues;

        var scope = $scope;

        login.login(values, function(response) {

            //alert("this function was called")

            scope.template = $scope.templates[1];

            scope.isSignedIn = true;
            scope.$apply();



        });



    }

    $scope.signOut = function() {
        $scope.template = $scope.templates[0];

        //remove modal
        $('#signin').modal('hide');
        $scope.isSignedIn = false;
    }

    $scope.toggleStatus = function() {
        if($scope.isSignedIn) {
            $scope.signOut();
            return false;
        } else {
            $('#signin').modal('show');
        }
    }

    $scope.isSignedIn = false;
}])


.controller('EditController', ['$scope', 'login', function($scope, login) {



    $scope.fields = login.getProfileStatus();



    $scope.toggleEditMode = function(item, subitem) {
        if(typeof subitem === "undefined") $scope.fields[item].isEditing = !$scope.fields[item].isEditing;
        else $scope.fields[item][subitem].isEditing = !$scope.fields[item][subitem].isEditing;


        if(item === "about" && $scope.fields[item].isEditing) {
            $("#about-text").attr('contentEditable', 'true')
        } else {
            $("#about-text").attr('contentEditable', 'false')

        }
        $scope.fields.about.value = $("#about-text").text();


        if(item === "contact" && $scope.fields[item][subitem].isEditing) {
            $($($(".contactWrapper")[subitem]).children("span")[1]).attr('contentEditable', 'true')
        } else {
            $($($(".contactWrapper")[subitem]).children("span")[1]).attr('contentEditable', 'false')

        }
        //direct function to contentEditable
    }

    $scope.addContact = function() {
        $scope.fields.contact.push({
            title: "Title (E-mail, phone, etc)...",
            value: "Value",
            isEditing: false
        });
    }

    $scope.removeContact = function(index) {
        //alert(index);
        //$scope.fields.contact.splice(index,1);
        $scope.fields.contact[index].value = "";
        $scope.fileds.contact[index].isEditing = false;
    }

    $scope.getLabel = function(value) {
        if(value === "") return "Add"
        return "Edit"
    }

    $scope.removePicture = function(index) {
        $scope.fields.pictures.splice(index, 1);
    }


    $scope.isAddingPic = false;
    $scope.newPicUrl = "";
    $scope.addPicture = function(url) {
        $scope.fields.pictures.push({
            url: url
        })
        $scope.isAddingPicture = false;
    }

}])

.directive("scroll", function($window) {
    return function(scope, element, attrs) {

        (function() { //create closure to avoid polluting the global namespace

            //alert();

            //these will change according to each program
            var profileTitle = "#profile-pic",
                bgWrap = ".bgWrap",
                navbarFixed = "nav",
                bgImgImg = ".background-img img",
                bgImg = ".background-img",
                bgLayer = ".background-layer";

            //if($(profileTitle).offset()) alert("initializing")
            //var initialOffset = $(profileTitle).offset().top; //used as a first value to create the function
            //WORKAROUND
            //var initialOffset = $(profileTitle).offset().top + $(".pre-negative").offset().top;
            var initialOffset = -55 + 400;

            //console.log('initialOffset is' , initialOffset)

            var bgHeight; //will be set when the image loads
            var bgWrapHeight = $(bgWrap).height(); //

            var scrollTop = $(window).scrollTop();
            var navbarHeight = $(navbarFixed).height();
            var initialDiff = initialOffset - scrollTop - navbarHeight;

            $(bgImgImg).load(function(e) {
                bgHeight = this.height;
            })

            var finalDiff = 0;
            var imgInitialValue = 200;
            var imgFinalValue = 100;
            var finalPercentage = imgFinalValue / imgInitialValue;

            function updateScroll() {
                var scrollTop = $(window).scrollTop();
                var d = initialOffset - scrollTop - navbarHeight;
                //console.log(d)

                var imgPercentage = calculateY({
                    x: initialDiff,
                    y: 1
                }, {
                    x: 0,
                    y: finalPercentage
                }, d);

                var bgPercentage = calculateY({
                    x: initialDiff,
                    y: 0
                }, {
                    x: 0,
                    y: 1
                }, d);

                //console.log(bgPercentage);
                $(profileTitle).css('transform', 'scale(' + imgPercentage + ')');

                var bgRGB = calculateY({
                    x: initialDiff,
                    y: 255
                }, {
                    x: 0,
                    y: 255
                }, d);
                bgRGB = parseInt(bgRGB, 10);
                var str = "rgba(" + bgRGB + "," + bgRGB + "," + bgRGB + "," + bgPercentage + ")";
                //$(bgLayer).css('background', str);

                //if(!bgHeight) return;
                var imgPosY = calculateY({
                    x: initialDiff,
                    y: 0
                }, {
                    x: 0,
                    y: -bgHeight + bgWrapHeight
                }, d);

                //new version
                var speed = .5;


                imgPosY = -speed * $(window).scrollTop();

                var str2 = 'translate(0,' + imgPosY + 'px)';

                //console.log(str2);

                //$(bgImg).css('transform', str2);

                if($(window).scrollTop() >= 400 - 55) {
                    $(".topbar").css("backgroundColor", "black");
                    $("#profile-pic").css("top", ($(window).scrollTop() - $(".row.negativeTopMargin").offset().top) + "px")
                } else {
                    $(".topbar").css("backgroundColor", "transparent")
                    $("#profile-pic").css("top", 0)

                } //55 is height of navbar! dont mistake with profile picture offset y



            }

            $(window).scroll(updateScroll);
            updateScroll();


            /* Calculates y of a point when given two other points of a linear function */
            function calculateY(p1, p2, x) {
                var a = (p1.y - p2.y) / (p1.x - p2.x),
                    b = p1.y - a * p1.x,
                    y = a * x + b;
                //console.log(y);
                var minY, maxY;
                if(p1.y > p2.y) {
                    maxY = p1.y;
                    minY = p2.y;
                } else {
                    maxY = p2.y;
                    minY = p1.y;
                }
                y = Math.min(Math.max(minY, y), maxY);
                //console.log("a:" , y)
                return y;
            }

            return {
                parallax: function() {},
                scale: function() {},
                fade: function() {}
            }

        })()

    };
});
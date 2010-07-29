/*
 * A jQuery plugin to parse RSS feeds that can be retrieved with JSONP
 *
 * LICENSE: This source file is subject to the MIT License, available at
 * http://www.opensource.org/licenses/mit-license.html
 *
 * @author      Jason Lengstorf <jason.lengstorf@ennuidesign.com>
 * @copyright   2010 Ennui Design
 * @license     http://www.opensource.org/licenses/mit-license.html  MIT License
 * @see         Blog class <ennui-cms/inc/class.blog.inc.php>
 */
(function($){

    $.fn.readYouTube = function(options)
    {
        var videoParams = $.extend($.fn.readYouTube.defaults.videoParams, options.videoParams),
            opts = $.extend($.fn.readYouTube.defaults, options),
            els = this;

        opts.videoParams = videoParams;

        if ( opts.feed===null )
        {
            return false;
        }
        else
        {
            $.ajax({
                    "dataType" : "jsonp",
                    "jsonpCallback" : opts.jsonpCallback,
                    "url" : opts.feed,
                    "error" : function(response) {console.log(response);},
                    "success" : function(resp) {
                            console.log(resp);
                            var markup = $.fn.readYouTube.handleResponse(resp, opts);
                            els.each(function(){
                                    $(this)
                                        .html(markup);
                                })
                        }
                });
        }

        return this;
    }

    $.fn.readYouTube.parseTemplate = function(entry, template)
    {
        return template.replace(/\{(\w+)}/g, function(m, key, value){
                return entry[key];
            });
    };

    $.fn.readYouTube.handleResponse = function(data, opts)
    {
        var markup = ['<ul>'],
            entries = data.feed.entry || [],
            videoParams = '',
            prop = null;

        for ( prop in opts.videoParams )
        {
            if ( opts.videoParams[prop]!==null )
            {
                videoParams += (videoParams ? "&" + prop : prop)
                        + "=" + opts.videoParams[prop];
            }
        }

        for ( var i=0, l=Math.min(entries.length, opts.display), keys=[]; i<l; i++ )
        {
            var ekey;
            if ( opts.random===true )
            {
                ekey = $.fn.readYouTube.getRandomEntry(keys, entries.length);
            }
            else
            {
                ekey = i;
            }

            var entry = entries[ekey],
                objUrl = entry.link[0].href
                        .replace("watch?v=", "v/")
                        .replace(
                                "&feature=youtube_gdata",
                                "?" + videoParams + "&feature=youtube_gdata"
                            ),
                cleaned = {
                    "title" : entry.title.$t,
                    "link" : entry.link[0].href,
                    "obj" : "<object  type=\"application/x-shockwave-flash\""
                            + " data=\"" + objUrl + "\">"
                            + "<param name=\"allowfullscreen\""
                            + " value=\"true\" />"
                            + "<param name=\"allowscriptaccess\""
                            + " value=\"always\" />"
                            + "<param name=\"movie\""
                            + " value=\"" + objUrl + "\" />"
                            + "</object>"
                };
            markup.push($.fn.readYouTube.parseTemplate(cleaned, opts.output));
        }

        markup.push('</ul>')

        return markup.join('');
    }

    $.fn.readYouTube.getRandomEntry = function(already_used, count)
    {
        var rand = Math.floor( Math.random() * (count-1) ),
            prop = null;
        for ( prop in already_used )
        {
            if ( already_used[prop]===rand )
            {
                return $.fn.readYouTube.getRandomEntry(already_used, count);
            }
            else
            {
                already_used[rand] = rand;
                return rand;
            }
        }
        return rand;
    };

    $.fn.readYouTube.defaults = {
        "feed" : null,
        "display" : 5,
        "jsonpCallback" : "handleResponse",
        "videoParams" : {
                "rel" : 0,
                "color1" : null,
                "color2" : null,
                "border" : 0,
                "showsearch" : 0,
                "showinfo" : 0,
                "fs" : 0,
                "autoplay" : 0,
                "start" : 0,
                "hd" : 0
            },
        "randomize" : false,
        "output" : "<li><h2>{title}</h2><p>{link}</p></li>",
        "callback" : function(){}
    };

})(jQuery);

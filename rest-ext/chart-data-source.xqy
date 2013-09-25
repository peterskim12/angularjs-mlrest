xquery version "1.0-ml";

module namespace chart-data-source = "http://marklogic.com/rest-api/resource/chart-data-source";

declare namespace roxy = "http://marklogic.com/roxy";
declare namespace search ="http://marklogic.com/appservices/search";

(: 
 : To add parameters to the functions, specify them in the params annotations. 
 : Example
 :   declare %roxy:params("uri=xs:string", "priority=xs:int") yourNSAlias:get(...)
 : This means that the get function will take two parameters, a string and an int.
 :)

(:
 :)
declare 
%roxy:params("")
function chart-data-source:get(
  $context as map:map,
  $params  as map:map
) as document-node()*
{
  let $datasource-names as xs:string* := 
    chart-data-source:options-for-dashboards((), ())/search:constraint[
      (search:collection|search:range|search:custom
      |search:geo-elem-pair[search:heatmap]
      |search:geo-attr-pair[search:heatmap]
      |search:geo-elem[search:heatmap])[fn:empty(@chart) or @chart eq fn:true()]
    ]/@name
  let $return-seq := (
    for $name in $datasource-names
    let $return-map := map:map()
    let $_ := map:put($return-map, 'name', $name)
    return $return-map)
  return (map:put($context, "output-types", "application/json"),
  xdmp:set-response-code(200, "OK"),
  document { 
    text{
      xdmp:to-json($return-seq)
    }
  }
  )
};

(:
 :)
declare 
%roxy:params("")
function chart-data-source:put(
    $context as map:map,
    $params  as map:map,
    $input   as document-node()*
) as document-node()?
{
  map:put($context, "output-types", "application/xml"),
  xdmp:set-response-code(200, "OK"),
  document { "PUT called on the ext service extension" }
};

(:
 :)
declare 
%roxy:params("")
function chart-data-source:post(
    $context as map:map,
    $params  as map:map,
    $input   as document-node()*
) as document-node()*
{
  map:put($context, "output-types", "application/xml"),
  xdmp:set-response-code(200, "OK"),
  document { "POST called on the ext service extension" }
};

(:
 :)
declare 
%roxy:params("")
function chart-data-source:delete(
    $context as map:map,
    $params  as map:map
) as document-node()?
{
  map:put($context, "output-types", "application/xml"),
  xdmp:set-response-code(200, "OK"),
  document { "DELETE called on the ext service extension" }
};



declare function chart-data-source:options-for-dashboards($facet-name, $limit) as element (search:options) {
  let $options := xdmp:eval('xquery version "1.0-ml"; fn:doc("/Default/new-appbuilder/rest-api/options/all.xml")/element()',
  (),
  <options xmlns="xdmp:eval">
      <database>{xdmp:modules-database()}</database>
    </options> 
  ) 
  return
    element search:options {
      $options/search:additional-query,

      for $c in $options/search:constraint
      return
        element search:constraint {
          $c/@*,
          if ($facet-name and $c/@name eq $facet-name) then
            let $facet := chart-data-source:remove-facet-limit($c/*)
            return
              element {fn:node-name($facet)}
              {
                $facet/@*[fn:not(self::attribute(facet))],
                attribute facet { "true" },
                $facet/node(),
                element search:facet-option { fn:concat("limit=", $limit)}
              }
          else
            let $facet := $c/*[fn:local-name() != 'annotation'][1]
            return
              element {fn:node-name($facet)}
              {
                $facet/@*[fn:not(self::attribute(facet))],
                attribute facet { "false" },
                $facet/node()
              }
        },

      (: here we removing snippet block and no need for return-result :)
      element search:return-results { fn:false() },
      element search:return-query { fn:false() },
      element search:return-metrics { fn:false() }
    }
};

declare function chart-data-source:remove-facet-limit($nodes as node()*)
{
  for $n in $nodes
  return
    typeswitch($n)
      case element(search:facet-option) return
        if (fn:contains($n, "limit=")) then ()
        else $n
      case element() return
        element {fn:node-name($n)}
        {
          chart-data-source:remove-facet-limit(($n/@*, $n/node()))
        }
      default return
        $n
};
